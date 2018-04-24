import { AnyAction } from 'redux';

import { NOTIFICATIONS_ACTIONS } from '@common/core/actions';
import { TNotification, TNotifications } from '@common/core/types';

export const notificationsReducer = (
  notifications: TNotifications = [],
  { type, payload }: AnyAction,
): TNotifications => {
  switch (type) {
    case NOTIFICATIONS_ACTIONS.SHOW: return [
      ...notifications,
      {
        ...<TNotification>payload.notification,
        hiding: false,
      },
    ];

    case NOTIFICATIONS_ACTIONS.HIDING:
      return notifications.map(
        not => not.id === payload.id ?
          { ...not, hiding: true } :
          not,
      );

    case NOTIFICATIONS_ACTIONS.HIDDEN:
      return notifications.filter(
        not => not.id !== payload.id,
      );

    default: return notifications;
  }
};
