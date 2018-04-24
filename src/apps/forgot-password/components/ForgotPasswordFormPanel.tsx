import * as React from 'react';

import { SmallLayoutContainer } from '@common/components';
import { ForgotPasswordForm } from '@forgot-password/components';

export const ForgotPasswordFormPanel = () => (
  <SmallLayoutContainer title='Forgot Password'>
    <ForgotPasswordForm />
  </SmallLayoutContainer>
);
