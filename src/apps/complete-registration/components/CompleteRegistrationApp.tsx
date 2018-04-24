import * as queryString from 'query-string';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppLayout, AppTitle } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import {
  CompleteRegistrationFormContainer,
  CompleteRegistrationSuccess,
} from '@complete-registration/components';
import { TSetPasswordFormData } from '@complete-registration/components/CompleteRegistrationForm';
import { completeRegistration } from '@complete-registration/services';

interface IRouteProps {
  location: Location;
  history: History;
}

interface IComponentOwnProps {
  hash: string;
  email: string;
}

interface IComponentOwnState {
  completed: boolean;
  submitting: boolean;
}

const mergeProps = (stateParams: any, dispatchParams: any, ownProps: IRouteProps) => {
  const params: any = queryString.parse(ownProps.location.search);

  return {
    ...stateParams,
    ...dispatchParams,
    ...ownProps,
    hash: params.hash,
    email: params.email,
  };
};

type IComponentProps = IComponentOwnProps & IRouteProps & IDispatchNotifyActionsProps;

class CompleteRegistrationAppComponent extends React.Component<IComponentProps, IComponentOwnState> {
  public state: IComponentOwnState = {
    completed: false,
    submitting: false,
  };

  public render() {
    const { email } = this.props;
    const { completed, submitting } = this.state;

    return (
      <AppTitle append='Complete Registration'>
        <AppLayout theme='dark'>
          {!completed ? (
            <CompleteRegistrationFormContainer
              email={email}
              onSubmit={this.onSubmit}
              submitting={submitting}
            />
            ) : (
            <CompleteRegistrationSuccess />
          )}
        </AppLayout>
      </AppTitle>
    );
  }

  private onSubmit = async (data: TSetPasswordFormData) => {
    this.setState({ submitting: true });
    const { email, hash } = this.props;

    try {
      await completeRegistration({
        ...data,
        email,
        hash,
      });

      this.setState({ completed: true });
    } catch (err) {
      let message = err.message || String(err);

      if (message === 'Could not find your email') {
        message = 'Could not find your email or link has been expired or used';
      }

      this.props.notifyError(message);
    }

    this.setState({ submitting: false });
  }
}

export const CompleteRegistrationApp = connect(
  null,
  mapDispatchNotifyActions,
  mergeProps,
)(CompleteRegistrationAppComponent);
