import * as React from 'react';

import { trimClassName } from '@common/core/helpers';

interface IAxmitSpinnerProps {
  spin?: boolean;
  hide?: boolean;
  className?: string;
  size?: TAxmitSpinnerSize;
}

export type TAxmitSpinnerSize = 'sm' | 'lg' | '2x' | '3x' | '4x';

export const AxmitSpinner: React.StatelessComponent<IAxmitSpinnerProps> = ({
  spin,
  hide,
  className,
  size = 'lg',
}) => (
  <i
    className={trimClassName(`
      fa fa-circle-o-notch fa-fw
      fa-${size}
      ${spin ? 'fa-spin' : ''}
      ${hide ? 'd-none' : ''}
      ${className || ''}
    `)}
  />
);
