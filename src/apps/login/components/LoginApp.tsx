import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppLayout, AppTitle, SmallLayoutContainer } from '@common/components';
import {
  DEFAULT_ALERT_NOTIFICATION_DELAY,
  IDispatchNotifyActionsProps,
  mapDispatchNotifyActions,
} from '@common/core/connectors';
import { ILoginFormData, LoginForm } from '@login/components';
import { clientGetInfo, login } from '@login/core/services';

interface IRouteProps {
  location: Location;
  history: History;
}

interface ILoginAppComponentOwnState {
  loading: boolean;
}

type TLoginAppComponentParams = IRouteProps & IDispatchNotifyActionsProps;

class LoginAppComponent extends React.Component<TLoginAppComponentParams, ILoginAppComponentOwnState> {
  public state: ILoginAppComponentOwnState = {
    loading: false,
  };

  private locasedEmailNotificationTimestamp: number;

  public render() {
    const { loading } = this.state;

    return (
      <AppTitle append='Login'>
        <AppLayout theme='dark'>
          <SmallLayoutContainer title='Welcome'>
            <LoginForm
              onSubmit={this.onSubmit}
              disabled={loading}
              onEmailLowercased={this.onEmailLowercased}
            />
          </SmallLayoutContainer>
        </AppLayout>
      </AppTitle>
    );
  }

  private onEmailLowercased = () => {
    const now = Date.now();

    if (
      !this.locasedEmailNotificationTimestamp ||
      now > this.locasedEmailNotificationTimestamp + DEFAULT_ALERT_NOTIFICATION_DELAY
    ) {
      this.props.notifyError(
        `Email with uppercase letters is not allowed.
        It was converted to lowercase automatically.`,
      );
      this.locasedEmailNotificationTimestamp = now;
    }

  }

  private onSubmit = async (data: ILoginFormData) => {
    this.setState({ loading: true });

    try {
      await login(data);

      let gotoOnboarding = false;

      try {
        const clientData = await clientGetInfo();
        gotoOnboarding = clientData && clientData.onboardingNeeded;
      } catch (e) {
        // Nothing to do - just try open Appl
      }

      window.location.href = gotoOnboarding ? '/onboarding' : '/app';
    } catch (err) {
      this.props.notifyError(err.message || String(err));
      this.setState({ loading: false });
    }
  }
}

export const LoginApp = connect(null, mapDispatchNotifyActions)(LoginAppComponent);
