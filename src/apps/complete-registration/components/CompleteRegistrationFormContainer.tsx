import * as React from 'react';

import { SmallLayoutContainer } from '@common/components';
import { CompleteRegistrationForm, TSetPasswordFormData } from '@complete-registration/components';

type TComponentOwnProps = {
  email: string;
  submitting: boolean;
  onSubmit(data: TSetPasswordFormData): void;
};

export const CompleteRegistrationFormContainer: React.StatelessComponent<TComponentOwnProps> = ({
  email,
  submitting,
  onSubmit,
}) => (
    <SmallLayoutContainer
      title='Your email has been confirmed'
      headerIcon='mail'
    >
      <p>
        Complete the registration below.<br />
        Your email: <b>{email}</b>
      </p>

      <CompleteRegistrationForm
        onSubmit={onSubmit}
        submitting={submitting}
      />
    </SmallLayoutContainer>
  );
