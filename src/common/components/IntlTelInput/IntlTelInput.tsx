import * as React from 'react';

import { IAxmitNativeFormAPI } from '@common/components/AxmitForms';
import {
  IntlTelInputPlain,
  lookupCountryByName,
  TReactIntlTelInput,
} from '@common/components/IntlTelInput';

interface IIntlTelInputProps {
  field: string;
  formApi: IAxmitNativeFormAPI;
  disabled?: boolean;
  defaultCountry?: string;
  formLabel?: string;
  required?: boolean;
}

export class IntlTelInput extends React.Component<IIntlTelInputProps> {
  private wrapperRef: HTMLDivElement;
  private reactTelInputRef: TReactIntlTelInput;

  private inputId = `IntlTelInput_${Date.now().toString()}`;

  public componentWillReceiveProps(nextProps: IIntlTelInputProps) {
    const reactTelInputRef = this.reactTelInputRef;
    const { defaultCountry: nextDefaultCountry, formApi, field } = nextProps;

    if (reactTelInputRef && nextDefaultCountry && !formApi.touched(field)) {
      const nextCountryData = lookupCountryByName(nextDefaultCountry);
      if (nextCountryData) {
        reactTelInputRef.setFlag(nextCountryData.iso2);
      }
    }

    this.props = nextProps;
  }

  public render() {
    const { field, formApi, disabled, formLabel, required } = this.props;

    return (
      <IntlTelInputPlain
        {...{
          field,
          formApi,
          disabled,
          formLabel,
          required,
          fieldId: this.inputId,
          onChange: this.onChange,
          setWrapperRef: this.setWrapperRef,
          setReactTelInputRef: this.setReactTelInputRef,
        }}
      />
    );
  }

  private setWrapperRef = (wrapperRef: HTMLDivElement) =>
    this.wrapperRef = wrapperRef

  private onChange = (valid: boolean) => {
    const wrapperRef = this.wrapperRef;
    const input: HTMLInputElement | null = wrapperRef && wrapperRef.querySelector(`#${this.inputId}`);

    if (input) {
      input.setCustomValidity(
        !valid ? 'Invalid phone number' : '',
      );
    }
  }

  private setReactTelInputRef = (ref: TReactIntlTelInput) =>
    this.reactTelInputRef = ref
}
