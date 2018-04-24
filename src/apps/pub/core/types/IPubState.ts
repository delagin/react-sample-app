import { IRegistrationFormState } from '@registration/core/types';
import { IResetPasswordState } from '@reset-password/core/types';

export interface IPubState {
  resetPasswordForm: IResetPasswordState;
  registrationForm: IRegistrationFormState;
}
