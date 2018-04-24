import { AnyAction } from 'redux';

import { REGISTRATION_FORM_ACTIONS } from '@registration/core/actions';
import { IRegistrationFormState } from '@registration/core/types';

const initialState = {
  sending: false,
  errorMessage: '',
  isSent: false,
  successMessage: '',
};

export const registrationFormReducer = (
  state: IRegistrationFormState = initialState,
  { type, payload }: AnyAction,
): IRegistrationFormState => {
  switch (type) {
    case REGISTRATION_FORM_ACTIONS.SUBMIT: return {
      ...state,
      sending: true,
      errorMessage: '',
    };

    case REGISTRATION_FORM_ACTIONS.SUBMIT_ERROR: return {
      ...state,
      sending: false,
      errorMessage: payload.error,
    };

    case REGISTRATION_FORM_ACTIONS.SUBMIT_SUCCESS: return {
      ...state,
      sending: false,
      isSent: true,
      successMessage: payload.message,
    };

    case REGISTRATION_FORM_ACTIONS.RESET: return {
      ...initialState,
    };

    default: return state;
  }
};
