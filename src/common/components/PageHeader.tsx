import * as React from 'react';

import '@common/styles/components/page-header.sass';

interface IPageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ title, children }: IPageHeaderProps) => (
  <header className={`page-header ${children ? 'page-header--has-children' : ''}`}>
    <h1 className='page-header__title'>{title}</h1>
    {children}
  </header>
);
