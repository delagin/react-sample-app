import * as React from 'react';
import { Button } from 'reactstrap';

import {
  AxmitFormGroup,
  AxmitInput,
  AxmitNativeForm,
  AxmitSpinner,
} from '@common/components';
import { equalityThoughInputPattern } from '@common/core/helpers';

const PASSWORD_PATTERN = String(process.env.PASSWORD_PATTERN || '');

interface ICompleteRegistrationFromAppOwnProps {
  submitting: boolean;
  onSubmit(data: TSetPasswordFormData): void;
}

export type TSetPasswordFormData = {
  password: string;
  passwordConfirmation: string,
};

class AxmitCompleteRegistrationForm extends AxmitNativeForm<{}, TSetPasswordFormData> { }

export const CompleteRegistrationForm: React.StatelessComponent<ICompleteRegistrationFromAppOwnProps> = ({
  onSubmit,
  submitting,
  }) => (
    <AxmitCompleteRegistrationForm
      onSubmit={onSubmit}
      defaults={{ password: '', passwordConfirmation: '' }}
    >
      {(form, { password }: TSetPasswordFormData) => (
        <div>
          <AxmitFormGroup formApi={form} field='password'>
            <AxmitInput
              field='password'
              type='password'
              min='0'
              pattern={PASSWORD_PATTERN}
              formLabel='Password'
              formApi={form}
              required={true}
              disabled={submitting}
            />
          </AxmitFormGroup>

          <AxmitFormGroup formApi={form} field='passwordConfirmation'>
            <AxmitInput
              field='passwordConfirmation'
              type='password'
              pattern={equalityThoughInputPattern(password)}
              min='0'
              formLabel='Password Again'
              formApi={form}
              required={true}
              disabled={submitting}
            />
          </AxmitFormGroup>

          <AxmitFormGroup>
            <i>Use a minimum password length of 8 characters and include
          at least one lowercase letter, one uppercase letter, and
          one number.
          </i>
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
              Set Password
            </Button>
          </AxmitFormGroup>

        </div>
      )}
    </AxmitCompleteRegistrationForm>
  );
