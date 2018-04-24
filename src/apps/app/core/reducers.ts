import { combineReducers } from 'redux';

// Include reducers directly because folder has the same name as this file.
import { initializationReducer } from '@app/core/reducers/initializationReducer';
import { userReducer } from '@app/core/reducers/userReducer';

import { IAppState } from '@app/core/types';
import { notificationsReducer } from '@common/core/reducers/notificationsReducer';

export const reducers = combineReducers<IAppState>({
  user: userReducer,
  notifications: notificationsReducer,
  initialization: initializationReducer,
});
