import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from '@pub/core/reducers';
import { IPubState } from '@pub/core/types';

export const store: Store<IPubState> = createStore<IPubState>(
  reducers,
  applyMiddleware(thunk),
);
