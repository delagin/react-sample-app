import * as React from 'react';

interface ISmallLayoutContainerHeaderProps {
  title: string;
}

export const SmallLayoutContainerHeader = (props: ISmallLayoutContainerHeaderProps) => (
  <div className='small-layout-container__info-panel'>
    <span className='small-layout-container__info-panel-text'>{props.title}</span>
    <span className='small-layout-container__info-panel-icon fa-stack'>
      <i className='fa fa-square-o fa-stack-2x' />
      <i className='fa fa-info fa-stack-1x' />
    </span>
  </div>
);
