import * as React from 'react';

import { TNotificationLevel } from '@common/core/types';

interface INotifictionProps {
  message: string;
  id: string;
  level?: TNotificationLevel;
  className?: string;
  onToggle(): void;
}

export const Notification =
  ({ id, message, level = 'info', onToggle, ...rest }: INotifictionProps) => (
    <div
      id={id}
      className={
        `alert notifications__notification--${level} ${rest.className} notifications__notification`}
    >
      {`${message || ''}`}
      <div className='close' onClick={onToggle} role='button'>&times;</div>
    </div>
  );
