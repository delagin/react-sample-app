import * as React from 'react';
import { Button } from 'reactstrap';

import {
  AxmitFormGroup,
  AxmitInput,
  AxmitNativeForm,
  AxmitSpinner,
} from '@common/components';
import { equalityThoughInputPattern } from '@common/core/helpers';
import { IResetPasswordFormData } from '@reset-password/core/types';

const PASSWORD_PATTERN = String(process.env.PASSWORD_PATTERN || '');

class AxmitResetPasswordForm extends AxmitNativeForm<{}, IResetPasswordFormData> { }

interface IResetPasswordFormProps {
  submitting: boolean;
  onSubmit(values: IResetPasswordFormData): void;
}

export const ResetPasswordForm: React.StatelessComponent<IResetPasswordFormProps> = ({
  onSubmit,
  submitting,
}) => (
  <AxmitResetPasswordForm
    onSubmit={onSubmit}
    defaults={{ password: '', passwordConfirmation: '' }}
  >
    {(form, { password }: IResetPasswordFormData) => (
      <div>
        <AxmitFormGroup formApi={form} field='password'>
          <AxmitInput
            field='password'
            type='password'
            min='0'
            formLabel='Password'
            formApi={form}
            required={true}
            placeholder='Enter new password'
            disabled={submitting}
            pattern={PASSWORD_PATTERN}
          />
        </AxmitFormGroup>

        <AxmitFormGroup formApi={form} field='passwordConfirmation'>
          <AxmitInput
            field='passwordConfirmation'
            type='password'
            formLabel='Confirm Password'
            formApi={form}
            required={true}
            placeholder='Enter new password again'
            disabled={submitting}
            pattern={equalityThoughInputPattern(password)}
          />
        </AxmitFormGroup>

        <AxmitFormGroup>
          <i>Use a minimum password length of 8 characters and include
          at least one lowercase letter, one uppercase letter, and
          one number.</i>
        </AxmitFormGroup>

        <AxmitFormGroup>
          <Button
            block={true}
            color='primary'
            type='submit'
            disabled={!form.valid() || submitting}
          >
            <AxmitSpinner
              spin={submitting}
              className='mr-2'
              hide={!submitting}
            />
            Send
          </Button>
        </AxmitFormGroup>
      </div>
    )}

  </AxmitResetPasswordForm>
);
