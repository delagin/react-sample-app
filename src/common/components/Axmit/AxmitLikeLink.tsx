import * as React from 'react';

interface IAxmitLikeLinkProps {
  children: React.ReactNode;
  onClick?(evt: React.SyntheticEvent<HTMLElement>): void;
}

export const AxmitLikeLink = (props: IAxmitLikeLinkProps) => (
  <span className='helper__like-link' onClick={props.onClick} {...props} role='link'>
    <u>{props.children}</u>
  </span>
);
