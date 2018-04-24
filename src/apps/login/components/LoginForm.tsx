import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import '@login/styles/login-form.sass';

import {
  AxmitEmailInput,
  AxmitFormGroup,
  AxmitInput,
  AxmitLikeLink,
  AxmitNativeForm,
} from '@common/components';

const EMAIL_PATTERN = String(process.env.EMAIL_PATTERN || '');

export type ILoginFormData = {
  email: string;
  password: string;
};

class AxmitLoginForm extends AxmitNativeForm<{}, ILoginFormData> { }

interface IComponentProps {
  disabled: boolean;
  onSubmit(values: ILoginFormData): void;
  onEmailLowercased?(actualEmail: string, locasedEmail: string): void;
}

export const LoginForm: React.StatelessComponent<IComponentProps> = ({
  onSubmit,
  disabled,
  onEmailLowercased,
  }) => (
    <AxmitLoginForm
      onSubmit={onSubmit}
      defaults={{ email: '', password: '' }}
    >
      {form => (
        <div>
          <AxmitFormGroup formApi={form} field='email'>
            <AxmitEmailInput
              field='email'
              formLabel='Email'
              pattern={EMAIL_PATTERN}
              formApi={form}
              required={true}
              disabled={disabled}
              onEmailLowercased={onEmailLowercased}
              className='pub-login-form--email-input'
              placeholder='Enter your email address'
            />
          </AxmitFormGroup>

          <AxmitFormGroup formApi={form} field='password'>
            <AxmitInput
              field='password'
              type='password'
              formLabel='Password'
              formApi={form}
              required={true}
              disabled={disabled}
              className='pub-login-form--password-input'
              placeholder='Enter your password'
            />
          </AxmitFormGroup>

          <AxmitFormGroup className='flex flex--justify-end'>
            <Link to='/forgot-password'>
              <AxmitLikeLink>
                Forgot Password?
              </AxmitLikeLink>
            </Link>
          </AxmitFormGroup>

          <AxmitFormGroup>
            <Button
              block={true}
              color='primary'
              type='submit'
              disabled={!form.valid() || disabled}
            >
              Log In
            </Button>
          </AxmitFormGroup>

          <AxmitFormGroup>
            <Link to='/registration' className='btn btn-outline-primary btn-block'>
              Register
            </Link>
          </AxmitFormGroup>
        </div>
      )}
    </AxmitLoginForm>
  );
