import { Dispatch } from 'react-redux';

import { USER_ACTIONS } from '@app/core/actions';
import { IUserState } from '@app/core/types';
import { showNotification } from '@common/core/actions';
import { AxmitWebSocket, IWSMessage, SERVICE_SIGNALS } from '@common/core/services';

const CLEARING_WS_URI = String(process.env.CLEARING_WS_URI || '');

export const INITIALIZATION_ACTIONS = {
  CONNECTING: 'INITIALIZATION_CONNECTING',
  CONNECTED: 'INITIALIZATION_CONNECTED',
  CONNECTION_ERROR: 'INITIALIZATION_CONNECTION_ERROR',
};

export const connect = () =>
  async(dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: INITIALIZATION_ACTIONS.CONNECTING });

      dispatch(showNotification({
        message: 'Connecting to server...',
        delay: 7000,
      }));

      let connected = false;

      try {
        await Promise.race([
          new Promise((resolve, reject) => {
            setTimeout(
              () => {
                if (!connected) {
                  reject('Unable to connect to server');
                } else {
                  resolve();
                }
              },
              5000,
            );
          }),
          new Promise(async(resolve) => {
            await AxmitWebSocket.init(AxmitWebSocket.buildUrl(CLEARING_WS_URI));
            connected = true;
            resolve();
          }),
        ]);
      } catch (err) {
        const message = err.toString();
        needReloginCallback(dispatch)(message);
      }

      AxmitWebSocket.on(SERVICE_SIGNALS.SESSION_ERROR, needReloginCallback(dispatch));
      AxmitWebSocket.on(SERVICE_SIGNALS.SESSION_EXPIRED, needReloginCallback(dispatch));

      const clientUserEnabled = await AxmitWebSocket.invoke<IUserState>(
        'client_control',
        'client_user_enabled',
      );

      dispatch({
        type: USER_ACTIONS.LOADED,
        payload: { clientUserEnabled },
      });

      setTimeout(
        () => {
          dispatch({ type: INITIALIZATION_ACTIONS.CONNECTED });

          dispatch(showNotification({
            message: 'Connected to server',
            delay: 2000,
          }));
        },
        250,
      );

    } catch (err) {
      let message: string;
      if (err && err.message) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      } else {
        message = 'Connection error';
      }

      dispatch(setConnectionError(message));
    }
  };

const needReloginCallback = (dispatch: Dispatch<any>) =>
  (message: IWSMessage) => {
    const errorMessage = message.error || 'Need to relogin';

    dispatch(showNotification({
      message: errorMessage,
      level: 'alert',
    }));

    dispatch(setConnectionError(errorMessage));

    setTimeout(() => dispatch(relogin()), 1000);
  };

const setConnectionError = (connectionError: string) =>
  (dispatch: Dispatch<any>) => {
    dispatch({
      type: INITIALIZATION_ACTIONS.CONNECTION_ERROR,
      payload: { connectionError },
    });

    dispatch(showNotification({
      message: connectionError,
      level: 'alert',
    }));
  };

const relogin = () =>
  () => window.location.href = '/login?action=logout';
