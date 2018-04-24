import { History } from 'history';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button } from 'reactstrap';

import { SmallLayoutContainer } from '@common/components';
import { navigateToLoginPage } from '@registration/core/actions';
import { IRegistrationFormState } from '@registration/core/types';

interface IMapProps {
  registrationForm: IRegistrationFormState;
}
const mapStateToProps = ({
  registrationForm,
}: { registrationForm: IRegistrationFormState }): IMapProps => ({
  registrationForm,
});

interface IDispatchProps {
  onNavigateToLoginPage(): void;
}
interface IResetPasswordSuccessPanelOwnProps {
  history: History;
}
const mapDispatchToProps = (
  dispatch: Dispatch<any>,
  { history }: IResetPasswordSuccessPanelOwnProps,
) => ({
  onNavigateToLoginPage() { dispatch(navigateToLoginPage(history)); },
});

const RegistrationSuccessPanelComponent: React.StatelessComponent<
  IDispatchProps & IMapProps & IResetPasswordSuccessPanelOwnProps
  > = props => (
  <SmallLayoutContainer
    title='You should receive an email shortly!'
    headerIcon='mail'
  >
    <p className='mb-5 text-center'>
      Please check your inbox and follow the instructions to set a password to complete your registration.
    </p>

    <Button
      block={true}
      color='primary'
      type='button'
      onClick={props.onNavigateToLoginPage}
    >
      Back to login page
    </Button>
  </SmallLayoutContainer>
);

export const RegistrationSuccessPanel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegistrationSuccessPanelComponent);
