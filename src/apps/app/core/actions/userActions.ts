import { Dispatch } from 'react-redux';

import { IUserState } from '@app/core/types';

export const USER_ACTIONS = {
  LOADED: 'USER_LOADED',
};

export const userLoaded = (userData: IUserState) =>
  (dispatch: Dispatch<any>) => {
    dispatch({
      type: USER_ACTIONS.LOADED,
      payload: { userData },
    });
  };
