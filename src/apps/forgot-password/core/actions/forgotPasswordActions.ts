import { History } from 'history';
import { Dispatch } from 'react-redux';

import { getCookie, WebServer } from '@common/core/services';

export const FORGOT_PASSWORD_FORM_ACTIONS = {
  SUBMIT: 'FORGOT_PASSWORD_SUBMIT',
  SUBMIT_ERROR: 'FORGOT_PASSWORD_SUBMIT_ERROR',
  SUBMIT_SUCCESS: 'FORGOT_PASSWORD_SUBMIT_SUCCESS',
  RESET: 'FORGOT_PASSWORD_RESET',
};

interface IForgotPasswordSendingData {
  forgot_email: string;
  action: string;
}

export const navigateToLoginPage = (history: History) =>
  async (dispatch: Dispatch<any>) => {
    history.push('/login');
    dispatch({ type: FORGOT_PASSWORD_FORM_ACTIONS.RESET });
  };

export const submit = (email: string) =>
  async (dispatch: Dispatch<any>) => {
    dispatch({ type: FORGOT_PASSWORD_FORM_ACTIONS.SUBMIT });

    try {
      const formData: IForgotPasswordSendingData = {
        forgot_email: email,
        action: 'forget',
      };

      const { data } = await WebServer.post(
        '/loginj',
        formData,
        {
          headers: { 'X-Xsrftoken': getCookie('_xsrf') },
        },
      );

      if (data.error) {
        throw new Error(data.error);
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FORM_ACTIONS.SUBMIT_SUCCESS,
          payload: { message: data.result },
        });
      }
    } catch (err) {
      dispatch({
        type: FORGOT_PASSWORD_FORM_ACTIONS.SUBMIT_ERROR,
        payload: { error: err.message || 'Unknown Error' },
      });
    }
  };
