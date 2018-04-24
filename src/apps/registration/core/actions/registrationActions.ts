import { History } from 'history';
import { Dispatch } from 'react-redux';

import { showAlertNotification } from '@common/core/actions';
import { getCookie, WebServer } from '@common/core/services';

export const REGISTRATION_FORM_ACTIONS = {
  SUBMIT: 'REGISTRATION_SUBMIT',
  SUBMIT_ERROR: 'REGISTRATION_SUBMIT_ERROR',
  SUBMIT_SUCCESS: 'REGISTRATION_SUBMIT_SUCCESS',
  RESET: 'REGISTRATION_RESET',
};

interface IRegistrationSendingData {
  email: string;
  firstname: string;
  lastname: string;
}

interface IRegistrationCredentials {
  email: string;
  firstName: string;
  lastName: string;
}

export const navigateToLoginPage = (history: History) =>
  async (dispatch: Dispatch<any>) => {
    history.push('/login');
    dispatch({ type: REGISTRATION_FORM_ACTIONS.RESET });
  };

export const submit = (values: IRegistrationCredentials) =>
  async (dispatch: Dispatch<any>) => {
    dispatch({ type: REGISTRATION_FORM_ACTIONS.SUBMIT });

    try {
      const formData: IRegistrationSendingData = {
        email: values.email,
        firstname: values.firstName,
        lastname: values.lastName,
      };

      const { data } = await WebServer.post(
        '/registration',
        formData,
        {
          headers: { 'X-Xsrftoken': getCookie('_xsrf') },
        },
      );

      if (data.error) {
        throw new Error(data.error[0] || data.error);
      } else {
        dispatch({
          type: REGISTRATION_FORM_ACTIONS.SUBMIT_SUCCESS,
          payload: { message: data.result },
        });
      }
    } catch (err) {
      const message = err.message || 'Unknown Error';

      dispatch({
        type: REGISTRATION_FORM_ACTIONS.SUBMIT_ERROR,
        payload: { error: err.message || 'Unknown Error' },
      });

      dispatch(showAlertNotification({ message }));
    }
  };
