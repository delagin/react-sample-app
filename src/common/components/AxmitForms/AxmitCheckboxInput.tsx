import * as React from 'react';

import '@common/styles/components/axmit-checkbox-input.scss';

import { AxmitFormLabel, AxmitInput, IAxmitInputProps, wasValidated } from '@common/components/AxmitForms';
import { trimClassName } from '@common/core/helpers';

interface IAxmitCheckboxInputProps extends IAxmitInputProps {
  formLabel?: string;
}

export const AxmitCheckboxInput: React.StatelessComponent<IAxmitCheckboxInputProps> = ({
  formLabel,
  children,
  formApi,
  field,
  ...rest,
}) => (
  <AxmitFormLabel
    check={true}
    className={trimClassName(`
      ${rest.required ? wasValidated({ formApi, field }) : ''}
      Axmit-checkbox-input
    `)}
  >
    <AxmitInput
      checked={formApi.value(field) === true}
      formApi={formApi}
      field={field}
      {...rest}
      type='checkbox'
    />
    <span className='axmit-input__element' />
    <span>{children || formLabel}</span>
  </AxmitFormLabel>
);
