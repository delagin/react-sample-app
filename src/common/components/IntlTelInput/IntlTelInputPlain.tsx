import * as React from 'react';
import ReactIntlTelInput from 'react-intl-tel-input';

import '@common/styles/components/intl-tel-input.sass';

import { AxmitFormLabel, IAxmitNativeFormAPI } from '@common/components/AxmitForms';
import { ICountryData } from '@common/components/IntlTelInput';

export type TReactIntlTelInput = typeof ReactIntlTelInput;

type TOnChange = (valid: boolean) => void;

interface IIntlTelInputPlainProps {
  field: string;
  formApi: IAxmitNativeFormAPI;
  value?: string;
  disabled?: boolean;
  formLabel?: string;
  required?: boolean;
  onChange?: TOnChange;
  setWrapperRef?(ref: HTMLDivElement): void;
  setReactTelInputRef?(ref: TReactIntlTelInput): void;
}

const onPhoneNumberChange = (
  formApi: IAxmitNativeFormAPI,
  field: string,
  onChange?: TOnChange,
) =>
  (valid: boolean, __: string, ___: ICountryData, num: string) => {
    formApi.setValue(field, num);
    if (onChange) {
      onChange(valid);
    }
  };

export const IntlTelInputPlain: React.StatelessComponent<IIntlTelInputPlainProps> = ({
  field,
  formApi,
  disabled,
  formLabel,
  required,
  value,
  setWrapperRef,
  setReactTelInputRef,
  onChange,
  ...rest,
}) => (
  <div>
    {formLabel &&
      <AxmitFormLabel>{formLabel}</AxmitFormLabel>
    }

    <div className='intl-tel-input__wrapper' ref={setWrapperRef}>
      <ReactIntlTelInput
        ref={setReactTelInputRef}
        {...rest}
        fieldName={field}
        css={['intl-tel-input', 'form-control']}
        utilsScript='libphonenumber.js'
        value={value || formApi.stringValue(field)}
        onPhoneNumberChange={onPhoneNumberChange(formApi, field, onChange)}
        onPhoneNumberBlur={formApi.touch('phone')}
        disabled={disabled}
        autoHideDialCode={true}
        separateDialCode={false}
        telInputProps={{
          required,
          pattern: '\\+?[0-9-()\\s]+',
        }}
      />
    </div>
  </div>
);
