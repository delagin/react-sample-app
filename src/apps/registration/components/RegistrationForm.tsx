import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup } from 'reactstrap';

import {
  AxmitCheckboxInput,
  AxmitEmailInput,
  AxmitFormGroup,
  AxmitInput,
  AxmitNativeForm,
  AxmitSpinner,
} from '@common/components';
import { mapDispatchNotifyActions } from '@common/core/connectors';
import { submit } from '@registration/core/actions';
import { IRegistrationFormState } from '@registration/core/types';

const EMAIL_PATTERN = String(process.env.EMAIL_PATTERN || '');
const ONBOARDING_NAME_MAX_LEN = parseInt(String(process.env.ONBOARDING_NAME_MAX_LEN || 23), 10);

class AxmitRegistrationForm extends AxmitNativeForm<{}, TRegistrationFormData> { }

type TRegistrationFormData = {
  email: string;
  firstName: string;
  lastName: string;
};

interface IMapProps {
  registrationForm: IRegistrationFormState;
}
const mapStateToProps = ({
  registrationForm,
}: { registrationForm: IRegistrationFormState }): IMapProps => ({
  registrationForm,
});

interface IDispatchProps {
  onSubmit(values: TRegistrationFormData): void;
  onEmailLowercased(actualEmail: string, locasedEmail: string): void;
}
const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  onSubmit: (values: TRegistrationFormData) => dispatch(submit(values)),
  onEmailLowercased: () =>
    mapDispatchNotifyActions(dispatch).notifyError(
      `Email with uppercase letters is not allowed.
      It was converted to lowercase automatically.`,
    ),
});

const registrationFormComponent = (props: IMapProps & IDispatchProps) => (
  <AxmitRegistrationForm
    onSubmit={props.onSubmit}
    defaults={{
      email: '',
      firstName: '',
      lastName: '',
    }}
  >
    {form => (
      <div>
        <p className='lead'>Welcome to Axmit!</p>

        <AxmitFormGroup formApi={form} field='email'>
          <AxmitEmailInput
            field='email'
            formLabel='Email'
            pattern={EMAIL_PATTERN}
            formApi={form}
            required={true}
            className='pub-login-form--email-input'
            onEmailLowercased={props.onEmailLowercased}
            placeholder='Enter your email address'
          />
        </AxmitFormGroup>

        <AxmitFormGroup formApi={form} field='firstName'>
          <AxmitInput
            field='firstName'
            type='text'
            formLabel='First name'
            formApi={form}
            required={true}
            maxLength={ONBOARDING_NAME_MAX_LEN}
            placeholder='Enter first name'
          />
        </AxmitFormGroup>

        <AxmitFormGroup formApi={form} field='lastName'>
          <AxmitInput
            field='lastName'
            type='text'
            formLabel='Last name'
            formApi={form}
            required={true}
            maxLength={ONBOARDING_NAME_MAX_LEN}
            placeholder='Enter last name'
          />
        </AxmitFormGroup>

        <AxmitFormGroup formApi={form} field='certification'>
          <AxmitCheckboxInput
            field='certification'
            formApi={form}
            required={true}
          >
            I agree to the NO terms and conditions
          </AxmitCheckboxInput>
        </AxmitFormGroup>

        <FormGroup>
          <Button
            block={true}
            color='primary'
            type='submit'
            disabled={!form.valid() || props.registrationForm.sending}
          >
            <AxmitSpinner
              spin={props.registrationForm.sending}
              className='mr-2'
              hide={!props.registrationForm.sending}
            />
            Register
          </Button>
        </FormGroup>

        <FormGroup>
          <Link
            className='btn btn-block btn-outline-primary'
            to='/login'
            title='Return to Login Page'
          >
            Cancel
          </Link>
        </FormGroup>
      </div>
    )}
  </AxmitRegistrationForm>
);

export const RegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(registrationFormComponent);
