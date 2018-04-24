import { History } from 'history';
import * as queryString from 'query-string';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppLayout, AppTitle } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import {
  ResetPasswordFormContainer,
  ResetPasswordSuccessPanel,
} from '@reset-password/components';
import { resetPasswordServiceReset } from '@reset-password/core/services';
import { IResetPasswordFormData } from '@reset-password/core/types';

interface IRouteProps {
  location: Location;
  history: History;
}

interface IComponentOwnProps {
  hash: string;
  email: string;
}

interface IComponentOwnState {
  formWasSent: boolean;
  submitting: boolean;
}

const mergeProps = (stateParams: any, dispatchParams: any, ownProps: IRouteProps) => {
  const params: any = queryString.parse(ownProps.location.search);

  return {
    ...stateParams,
    ...dispatchParams,
    ...ownProps,
    email: params.femail,
    hash: params.fhash,
  };
};

type IComponentProps = IComponentOwnProps & IRouteProps & IDispatchNotifyActionsProps;

class ResetPasswordAppComponent extends React.Component<IComponentProps, IComponentOwnState> {
  public state: IComponentOwnState = {
    formWasSent: false,
    submitting: false,
  };

  public render() {
    const { email } = this.props;
    const { formWasSent, submitting } = this.state;

    return (
      <AppTitle append='Reset Password'>
        <AppLayout theme='dark'>
          {!formWasSent ? (
            <ResetPasswordFormContainer
              email={email}
              onSubmit={this.onSubmit}
              submitting={submitting}
            />
          ) : (
            <ResetPasswordSuccessPanel/>
          )}
        </AppLayout>
      </AppTitle>
    );
  }

  private onSubmit = async (data: IResetPasswordFormData) => {
    this.setState({ submitting: true });

    const { email, hash } = this.props;

    try {
      await resetPasswordServiceReset({
        ...data,
        email,
        hash,
      });

      this.setState({ formWasSent: true });
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ submitting: false });
  }
}

export const ResetPasswordApp = connect(
  null,
  mapDispatchNotifyActions,
  mergeProps,
)(ResetPasswordAppComponent);
