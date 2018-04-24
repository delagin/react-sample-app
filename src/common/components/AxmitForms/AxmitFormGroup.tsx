import * as React from 'react';
import { FormGroup } from 'reactstrap';

import { IWasValidatedProps, wasValidated } from '@common/components/AxmitForms';

interface IAxmitFormGroup extends IWasValidatedProps {
  children?: React.ReactNode;
}

export const AxmitFormGroup = ({ children, formApi, field, className, ...rest }: IAxmitFormGroup) => (
  <FormGroup
    className={wasValidated({ formApi, field, className })}
    {...rest}
  >
    {children}
  </FormGroup>
);
