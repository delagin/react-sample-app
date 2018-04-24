import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Transition } from 'react-transition-group';

import '@common/styles/components/notifications.sass';

import { Notification } from '@common/components/Notifications';
import { duration, hideNotification } from '@common/core/actions';
import { TNotification } from '@common/core/types';

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles: {[key: string]: any} = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

interface IMapState {
  notifications: TNotification[];
}
const mapStateToProps = ({
  notifications,
}: IMapState): IMapState => ({
  notifications,
});

interface IMapDispatch {
  hide(not: TNotification): void;
}
const mapDispatchToProps = (
  dispatch: Dispatch<any>,
): IMapDispatch => ({
  hide(notification: TNotification) { dispatch(hideNotification(notification)); },
});

const NotificationsHubComponent: React.StatelessComponent<
  IMapState & IMapDispatch
> = props => (
  <div className='notifications'>
    {props.notifications.map(not => (
      <Transition in={!not.hiding} timeout={duration} key={not.id}>
        {(state: string) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[ state ],
            }}
          >
            <Notification onToggle={props.hide.bind(props, not)} {...not} />
          </div>
        )}
      </Transition>
    ))}
  </div>
);

export const NotificationsHub = connect<IMapState, IMapDispatch, any>(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsHubComponent);
