import * as React from 'react';
import { Label } from 'reactstrap';

interface ISmallStrongLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  check?: boolean;
}

export const AxmitFormLabel: React.StatelessComponent<ISmallStrongLabelProps> = ({
  children,
  ...rest,
}) => (
  <Label {...{ ...rest }}>{children}</Label>
);
