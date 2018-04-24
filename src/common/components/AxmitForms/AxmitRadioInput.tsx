import * as React from 'react';
import { Input, Label } from 'reactstrap';

import '@common/styles/components/axmit-radio-input.scss';

import { IAxmitNativeFormAPI, TInputValue } from '@common/components/AxmitForms';

interface IAxmitRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: any;
  formApi: IAxmitNativeFormAPI;
  field: string;
  value?: string;
  defaultValue?: string;
  formLabel?: string;
  onValueChange?(value: TInputValue): void;
}

const AxmitInputPlain = ({
  formApi,
  field,
  value,
  defaultValue = '',
  onValueChange,
  ...rest,
}: IAxmitRadioProps) => (
    <Input
      checked={formApi.value(field) === String(value || defaultValue || '')}
      name={field}
      {...rest}
      value={value || defaultValue}
      onChange={formApi.onChangeInput(field, onValueChange)}
      onBlur={formApi.touch(field)}
      type='radio'
    />
  );

export const AxmitRadioInput = ({
  formLabel,
  ...rest,
}: IAxmitRadioProps) => (
  <Label className='axmit-radio-input'>
    <AxmitInputPlain {...rest} />
    <span className='axmit-input__element' />
    <span> {formLabel}</span>
  </Label>
);
