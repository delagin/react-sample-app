import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { store } from '@pub/core/store';

import { NotificationsHub } from '@common/components';
import { CompleteRegistrationApp } from '@complete-registration/components';
import { ForgotPasswordApp } from '@forgot-password/components';
import { LoginApp } from '@login/components';
import { RegistrationApp } from '@registration/components';
import { ResetPasswordApp } from '@reset-password/components';

export const PubApp = () => (
  <Provider store={store}>
    <section className='app__inner'>
      <Router>
        <Switch>
          <Route path='/forgot-password' component={ForgotPasswordApp} />
          <Route path='/reset-password' component={ResetPasswordApp} />
          <Route path='/login' component={LoginApp} />
          <Route path='/registration' component={RegistrationApp} />
          <Route path='/complete-registration' component={CompleteRegistrationApp} />
          <Redirect to='/login' />
        </Switch>
      </Router>
      <NotificationsHub />
    </section>
  </Provider>
);
