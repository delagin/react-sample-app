import { AnyAction } from 'redux';

import { USER_ACTIONS } from '@app/core/actions';
import { IUserState } from '@app/core/types';

const initialState: IUserState = {
  enabled: false,
  fullname: '',
  roles: [],
  appEnabled: false,
  email: '',
  id: -1,
};

export const userReducer = (
  state: IUserState = { ...initialState },
  { type, payload }: AnyAction,
): IUserState => {
  switch (type) {
    case USER_ACTIONS.LOADED: return {
      ...payload.userData,
    };

    default: return state;
  }
};
