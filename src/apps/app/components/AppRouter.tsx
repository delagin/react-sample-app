import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { Dispatch } from 'redux';

import { AppRoutes } from '@app/components/AppRoutes';
import { menu } from '@app/core/menu';

import { connect as appConnect } from '@app/core/actions';
import { IInitializationState, IUserState } from '@app/core/types';
import { AppLayout, AppLoading, RedirectHref } from '@common/components';
import { filterMenuForRoles } from '@common/core/services';

interface IStateMap {
  initialization: IInitializationState;
  user: IUserState;
}

interface IDispatchMap {
  connect(): void;
}

class AppRouterComponent extends React.Component<IStateMap & IDispatchMap> {
  public componentWillMount() {
    this.props.connect();
  }

  public render() {
    const { connected } = this.props.initialization;
    const { enabled, appEnabled, roles } = this.props.user;

    const allowedMenu = filterMenuForRoles(menu, roles);

    let applLayout: React.ReactNode = '';

    if (connected) {
      if (!enabled) {
        applLayout = (
          <AppLayout theme='light'>
            <RedirectHref to='/login?action=logout' />
          </AppLayout>
        );
      } else {
        if (!appEnabled) {
          applLayout = (
            <AppLayout theme='light'>
              <RedirectHref to='/onboarding' />
            </AppLayout>
          );
        } else {
          applLayout = (
            <Router>
              <AppLayout theme='light' menu={allowedMenu}>
                <Switch>
                  {AppRoutes(allowedMenu)}
                  <Redirect to='/app/overview' />
                </Switch>
              </AppLayout>
            </Router>
          );
        }
      }
    }

    return applLayout || (
      <AppLayout theme='light'>
        <AppLoading />
      </AppLayout>
    );
  }
}

export const AppRouter = connect<IStateMap, IDispatchMap, any>(
  ({ initialization, user }) => ({ initialization, user }),
  (dispatch: Dispatch<any>) => ({
    connect() { dispatch(appConnect()); },
  }),
)(AppRouterComponent);
