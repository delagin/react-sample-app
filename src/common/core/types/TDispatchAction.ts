import { Dispatch } from 'react-redux';

export type TDispatchAction<State = any> = (
  dispatch: Dispatch<any>,
  getState: () => State,
) => void;
