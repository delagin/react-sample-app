import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppLayout, AppTitle } from '@common/components';
import { RegistrationFormPanel, RegistrationSuccessPanel } from '@registration/components';
import { IRegistrationFormState } from '@registration/core/types';

interface IMapProps {
  registrationForm: IRegistrationFormState;
}
const mapStateToProps = ({
  registrationForm,
}: { registrationForm: IRegistrationFormState }): IMapProps => ({
  registrationForm,
});

interface IRegistrationAppProps {
  history: History;
}

const registrationAppComponent = (props: IMapProps & IRegistrationAppProps) => (
  <AppTitle append='Registration' >
    <AppLayout theme='dark'>
      {
        !props.registrationForm.isSent ?
          <RegistrationFormPanel />
          :
          <RegistrationSuccessPanel history={props.history} />
      }
    </AppLayout>
  </AppTitle >
);

export const RegistrationApp = connect<IMapProps, void, IRegistrationAppProps>(
  mapStateToProps,
)(registrationAppComponent);
