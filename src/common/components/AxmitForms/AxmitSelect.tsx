import * as React from 'react';
import { Input } from 'reactstrap';

import { AxmitFormLabel, IAxmitNativeFormAPI } from '@common/components/AxmitForms';
import { trimClassName } from '@common/core/helpers';

export type TOption = {
  value: string;
  label?: string;
};

interface IAxmitSelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formApi: IAxmitNativeFormAPI;
  field: string;
  options: TOption[];
  value?: string;
  label?: string;
  formLabel?: string;
  size?: any; // required by TS capability
  customValidity?: string;
  onSelectValue?(value: string): void;
}

const setCustomValidity = (customValidity: string | void) =>
  (ref: HTMLInputElement) => {
    if (ref && typeof customValidity === 'string') {
      ref.setCustomValidity(customValidity || '');
    }
  };

export const AxmitSelectPlain: React.StatelessComponent<IAxmitSelectProps> = ({
  field,
  options,
  label,
  value,
  formApi,
  onSelectValue,
  customValidity,
  ...rest,
}) => (
  <Input
    {...rest}
    name={field}
    value={value || formApi.stringValue(field)}
    onChange={formApi.onChangeInput(field, onSelectValue)}
    onBlur={formApi.touch(field)}
    type='select'
    innerRef={setCustomValidity(customValidity)}
    className={trimClassName(`
      ${rest.className || ''}
      ${(label && !formApi.stringValue(field)) ? 'not-selected' : ''}
    `)}
  >
    {label && (
      <option
        value=''
        aria-selected={value == null}
      >
        {label}
      </option>
    )}

    {options.map(({ value: optionValue, label: optionLabel }, key) => (
      <option
        key={`select-option-${field}-${key}`}
        aria-selected={value === optionValue}
        value={optionValue}
      >
        {optionLabel || optionValue}
      </option>
    ))}
  </Input>
);

export const AxmitSelect = ({
  formLabel,
  ...rest,
}: IAxmitSelectProps) => (
  formLabel ?
    <div>
      <AxmitFormLabel>{formLabel}</AxmitFormLabel>
      <AxmitSelectPlain {...rest} />
    </div>
    :
    <AxmitSelectPlain {...rest} />
);
