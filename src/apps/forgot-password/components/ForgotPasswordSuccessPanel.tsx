import { History } from 'history';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { SmallLayoutContainer } from '@common/components';
import { navigateToLoginPage } from '@forgot-password/core/actions';
import { IForgotPasswordState } from '@forgot-password/core/types';

interface IDispatchProps {
  onNavigateToLoginPage(): void;
}

interface IMapProps {
  forgotPasswordForm: IForgotPasswordState;
}

interface IForgotPasswordSuccessPanelProps {
  history: History;
}

export const ForgotPasswordSuccessPanel =
  connect<IMapProps, IDispatchProps, IForgotPasswordSuccessPanelProps>(
    ({ forgotPasswordForm }) => ({ forgotPasswordForm }),
    (dispatch: Dispatch<any>, { history }) => ({
      onNavigateToLoginPage: () => dispatch(navigateToLoginPage(history)),
    }),
  )(props => (
    <SmallLayoutContainer
      title='Email was successfully sent'
      headerIcon='mail'
    >
      <p className='mb-5 text-center'>{props.forgotPasswordForm.successMessage}</p>

      <Button
        block={true}
        color='primary'
        type='button'
        onClick={props.onNavigateToLoginPage}
      >
        Back to login page
      </Button>
    </SmallLayoutContainer>
  ),
);
