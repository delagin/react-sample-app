import * as moment from 'moment';
import * as React from 'react';
import { default as ReactDatePicker, ReactDatePickerProps } from 'react-datepicker';

import '@common/styles/components/axmit-datepicker.sass';

import { AxmitFormLabel, IAxmitNativeFormAPI } from '@common/components/AxmitForms';
import { TPartialOptionalOf } from '@common/core/types';

export const DATEPICKER_DATE_FORMAT = 'DD MMM YYYY';

// Use TPartialOptionalOf to prevent onChange requiring and 'bad implementation' errors
type IAxmitDatePickerProps = {
  field: string;
  formApi: IAxmitNativeFormAPI;
  formLabel?: string;
  fullWidth?: boolean;
} & TPartialOptionalOf<ReactDatePickerProps>;

// Handle date change and process with AxmitNativeFormAPI.
const onDateChange = (formApi: IAxmitNativeFormAPI, field: string) =>
  (date: moment.Moment | null): void =>
    formApi.setValue(field, date ? date.format() : void 0);

export const AxmitDatePickerPlain: React.StatelessComponent<IAxmitDatePickerProps> =
  ({
    className,
    formApi, field,
    maxDate = moment().endOf('day'),
    dateFormat = DATEPICKER_DATE_FORMAT,
    ...rest,
  }) => (
    <ReactDatePicker
      {...rest}
      className={`form-control axmit-datepicker__input ${className || ''}`}
      dateFormat={dateFormat}
      selected={formApi.stringValue(field) ? moment(formApi.stringValue(field)) : null}
      onChange={onDateChange(formApi, field)}
      peekNextMonth={true}
      showMonthDropdown={true}
      showYearDropdown={true}
      dropdownMode='select'
      maxDate={maxDate}
      popperPlacement='bottom'
      autoComplete='off'
    />
  );

const containerStyle = (fullWidth: boolean): string =>
  `${fullWidth ? 'react-datepicker--fullwidth' : ''}`;

export const AxmitDatePicker: React.StatelessComponent<IAxmitDatePickerProps> = ({
  formLabel,
  fullWidth,
  ...rest,
}) => formLabel ? (
    <div className={containerStyle(fullWidth || false)}>
      <AxmitFormLabel>{formLabel}</AxmitFormLabel>
      <AxmitDatePickerPlain {...rest} />
    </div>
  ) : (
    <div className={containerStyle(fullWidth || false)}>
      <AxmitDatePickerPlain {...rest} />
    </div>
  );
