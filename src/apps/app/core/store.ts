import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from '@app/core/reducers';
import { IAppState } from '@app/core/types';

export const store: Store<IAppState> = createStore<IAppState>(
  reducers,
  applyMiddleware(thunk),
);
