
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppLayout, AppTitle } from '@common/components';
import { ForgotPasswordFormPanel, ForgotPasswordSuccessPanel } from '@forgot-password/components';
import { IForgotPasswordState } from '@forgot-password/core/types';

interface IMapProps {
  forgotPasswordForm: IForgotPasswordState;
}
const mapStateToProps = ({
  forgotPasswordForm,
}: { forgotPasswordForm: IForgotPasswordState}): IMapProps => ({
  forgotPasswordForm,
});

interface IForgotPasswordAppProps {
  history: History;
}

export const ForgotPasswordApp =
  connect<IMapProps, never, IForgotPasswordAppProps>(
    mapStateToProps,
  )((props: IMapProps & IForgotPasswordAppProps) => (
    <AppTitle append='Forgot Password'>
      <AppLayout theme='dark'>
        {
          !props.forgotPasswordForm.isSent ?
            <ForgotPasswordFormPanel />
            :
            <ForgotPasswordSuccessPanel history={props.history} />
        }
      </AppLayout>
    </AppTitle>
  ),
);
