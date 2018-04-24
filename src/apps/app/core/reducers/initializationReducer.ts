import { AnyAction } from 'redux';

import { INITIALIZATION_ACTIONS } from '@app/core/actions';
import { IInitializationState } from '@app/core/types';

const initialState: IInitializationState = {
  connected: false,
  connecting: false,
};

export const initializationReducer = (
  state: IInitializationState = { ...initialState },
  { type, payload }: AnyAction,
) => {
  switch (type) {
    case INITIALIZATION_ACTIONS.CONNECTING: return {
      connecting: true,
      connected: false,
    };

    case INITIALIZATION_ACTIONS.CONNECTED: return {
      connecting: false,
      connected: true,
      connectionError: void 0,
    };

    case INITIALIZATION_ACTIONS.CONNECTION_ERROR: return {
      connected: false,
      connecting: true,
      connectionError: payload.connectionError,
    };

    default: return state;
  }
};
