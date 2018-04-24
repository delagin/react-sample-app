import * as React from 'react';
import { Provider } from 'react-redux';

import { store } from '@app/core/store';

import { AppRouter } from '@app/components/AppRouter';
import { NotificationsHub } from '@common/components/Notifications';

export const App = () => (
  <Provider store={store}>
    <section className='app__inner'>
      <AppRouter />
      <NotificationsHub />
    </section>
  </Provider>
);
