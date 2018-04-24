import * as React from 'react';

import { AxmitInput, IAxmitInputProps } from '@common/components/AxmitForms';

const locase = (value: string): string =>
  String(value || '').toLocaleLowerCase();

interface IAxmitEmailInputProps extends IAxmitInputProps {
  // tslint:disable-next-line no-reserved-keywords
  type?: 'email';
  onEmailLowercased?(actualEmail: string, locasedEmail: string): void;
}

interface IAxmitEmailInputState {
  filteredEmailValue: string;
}

export class AxmitEmailInput extends React.Component<IAxmitEmailInputProps, IAxmitEmailInputState> {
  public state: IAxmitEmailInputState = {
    filteredEmailValue: '',
  };

  public componentWillReceiveProps(props: IAxmitEmailInputProps) {
    this.props = props;

    const { value, field, formApi, onEmailLowercased } = props;

    const emailValue = value || formApi.stringValue(field);
    const locasedEmailValue = locase(emailValue);

    this.setState({
      filteredEmailValue: locasedEmailValue,
    });

    if (locasedEmailValue !== emailValue) {
      if (onEmailLowercased) {
        onEmailLowercased(emailValue, locasedEmailValue);
      }

      formApi.setValue(field, locasedEmailValue);
    }
  }

  public render() {
    const { onEmailLowercased, ...rest } = this.props;
    const { filteredEmailValue } = this.state;

    return (
      <AxmitInput
        {...rest}
        value={filteredEmailValue}
        type='email'
      />
    );
  }
}
