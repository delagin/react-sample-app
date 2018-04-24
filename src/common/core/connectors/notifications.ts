import { Dispatch } from 'react-redux';

import { showAlertNotification, showInfoNotification } from '@common/core/actions';

export { DEFAULT_ALERT_NOTIFICATION_DELAY, DEFAULT_SUCCESS_NOTIFICATION_DELAY } from '@common/core/actions';

export interface IDispatchNotifyActionsProps {
  notifySuccess(message: string): void;
  notifyError(message: string): void;
}

export const mapDispatchNotifyActions = (dispatch: Dispatch<any>): IDispatchNotifyActionsProps => ({
  notifySuccess(message) {
    dispatch(showInfoNotification({ message }));
  },
  notifyError(message) {
    dispatch(showAlertNotification({ message }));
  },
});
