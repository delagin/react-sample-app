import * as React from 'react';

import { SmallLayoutContainer, SmallLayoutContainerInfoToggle } from '@common/components';
import { RegistrationForm, RegistrationInfoBlock } from '@registration/components';

const getTitle = (infoOpened: boolean): React.ReactNode | string =>
  infoOpened ? (
    'Registration Information'
  ) : (
    'Register as A Happy Axmit Customer'
  );

export const RegistrationFormPanel = () => (
  <SmallLayoutContainer>
    <SmallLayoutContainerInfoToggle title={getTitle}>
      {(infoOpened: boolean) => (infoOpened ?
        <RegistrationInfoBlock />
        :
        <RegistrationForm />
      )}
    </SmallLayoutContainerInfoToggle >
  </SmallLayoutContainer >
);
