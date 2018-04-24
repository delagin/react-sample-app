import * as React from 'react';

import { SmallLayoutContainer } from '@common/components';
import { ResetPasswordForm } from '@reset-password/components';
import { IResetPasswordFormData } from '@reset-password/core/types';

type TComponentOwnProps = {
  email: string;
  submitting: boolean;
  onSubmit(data: IResetPasswordFormData): void;
};

// tslint:disable-next-line:export-name
export const ResetPasswordFormContainer: React.StatelessComponent<TComponentOwnProps> = ({
  email,
  submitting,
  onSubmit,
}) => (
    <SmallLayoutContainer
      title='Please Reset Your Password'
      headerIcon='mail'
    >
      <p className='text-center'>Your email: {email}</p>
      <ResetPasswordForm onSubmit={onSubmit} submitting={submitting}/>
    </SmallLayoutContainer>
  );
