import { IInitializationState, IUserState } from '@app/core/types';
import { TNotifications } from '@common/core/types';

export interface IAppState {
  user: IUserState;
  notifications: TNotifications;
  initializationState: IInitializationState;
}
