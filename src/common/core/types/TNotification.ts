export type TNotificationLevel =
  'info' |
  'alert';

export interface INotification {
  message: string;
  level?: TNotificationLevel;
  delay?: number;
}

export type TNotification = INotification & {
  hiding?: boolean;
  id: string;
};

export type TNotifications = TNotification[];
