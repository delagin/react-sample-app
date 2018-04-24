import { Dispatch } from 'redux';
import { setTimeout } from 'timers';

import { INotification, TNotification, TNotifications } from '@common/core/types';

export const NOTIFICATIONS_ACTIONS = {
  SHOW: 'NOTIFICATION_SHOW',
  HIDING: 'NOTIFICATION_HIDING',
  HIDDEN: 'NOTIFICATIONS_HIDDEN',
};

export const duration = 300;
export const DEFAULT_SUCCESS_NOTIFICATION_DELAY = 5000;
export const DEFAULT_ALERT_NOTIFICATION_DELAY = 10000;

/**
 * Generate uniq notification id for app life
 */
const newNotificationId = ((initialId) => {
  let id = initialId;

  return () => {
    id += 1;

    return `NOTIFICATION-${id}`;
  };
})(1);

export const hideNotification = (notification: TNotification) =>
  (dispatch: Dispatch<any>) => {
    dispatch({
      type: NOTIFICATIONS_ACTIONS.HIDING,
      payload: { id: notification.id },
    });

    setTimeout(
      () => dispatch({
        type: NOTIFICATIONS_ACTIONS.HIDDEN,
        payload: { id: notification.id },
      }),
      duration + 10,
    );
  };

export const showNotification = (notification: INotification) =>
  (dispatch: Dispatch<any>, getState: () => { notifications: TNotifications }) => {
    const id = newNotificationId();

    dispatch({
      type: NOTIFICATIONS_ACTIONS.SHOW,
      payload: { notification: { ...notification, id } },
    });

    if (notification.delay != null && notification.delay > 0) {
      const craetedNot = getState().notifications.filter((not => not.id === id))[0];

      setTimeout(
        () => hideNotification(craetedNot)(dispatch),
        notification.delay,
      );
    }
  };

export const showInfoNotification = (notification: INotification) =>
  showNotification({
    delay: DEFAULT_SUCCESS_NOTIFICATION_DELAY,
    level: 'info',
    ...notification,
  });

export const showAlertNotification = (notification: INotification) =>
  showNotification({
    delay: DEFAULT_ALERT_NOTIFICATION_DELAY,
    level: 'alert',
    ...notification,
  });
