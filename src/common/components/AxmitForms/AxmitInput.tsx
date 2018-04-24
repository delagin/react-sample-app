import * as React from 'react';
import { Input } from 'reactstrap';

import { AxmitFormLabel, IAxmitNativeFormAPI } from '@common/components/AxmitForms';

type TInputType =
  | 'text'
  | 'email'
  | 'select'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'button'
  | 'reset'
  | 'submit'
  | 'date'
  | 'datetime-local'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'week'
  | 'password'
  | 'datetime'
  | 'time'
  | 'color';

export interface IAxmitInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // tslint:disable-next-line no-reserved-keywords
  type?: TInputType;
  size?: any;
  formApi: IAxmitNativeFormAPI;
  field: string;
  value?: string;
  formLabel?: React.ReactNode;
  onValueChange?(value: TInputType): void;
}

const AxmitInputPlain = ({
  formApi,
  field,
  value,
  onValueChange,
  type = 'text',
  ...rest,
}: IAxmitInputProps) => (
    <Input
      value={value || formApi.stringValue(field)}
      onChange={formApi.onChangeInput(field, onValueChange)}
      onBlur={formApi.touch(field)}
      type={type}
      name={field}
      {...rest}
    />
  );

export const AxmitInput = ({
  formLabel,
  ...rest,
}: IAxmitInputProps) => (
  formLabel ? (
    <div>
      <AxmitFormLabel>{formLabel}</AxmitFormLabel>
      <AxmitInputPlain {...rest} />
    </div>
  ) : (
    <AxmitInputPlain {...rest}/>
  )
);
