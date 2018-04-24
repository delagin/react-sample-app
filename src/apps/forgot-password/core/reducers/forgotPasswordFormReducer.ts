import { AnyAction } from 'redux';

import { FORGOT_PASSWORD_FORM_ACTIONS } from '@forgot-password/core/actions';
import { IForgotPasswordState } from '@forgot-password/core/types';

const initialState = {
  sending: false,
  error: '',
  isSent: false,
  successMessage: '',
};

export const forgotPasswordFormReducer = (
  state: IForgotPasswordState = initialState,
  { type, payload }: AnyAction,
): IForgotPasswordState => {
  switch (type) {
    case FORGOT_PASSWORD_FORM_ACTIONS.SUBMIT: return {
      ...state,
      sending: true,
      error: '',
    };

    case FORGOT_PASSWORD_FORM_ACTIONS.SUBMIT_ERROR: return {
      ...state,
      sending: false,
      error: payload.error,
    };

    case FORGOT_PASSWORD_FORM_ACTIONS.SUBMIT_SUCCESS: return {
      ...state,
      sending: false,
      isSent: true,
      successMessage: payload.message,
    };

    case FORGOT_PASSWORD_FORM_ACTIONS.RESET: return {
      ...initialState,
    };

    default: return state;
  }
};
