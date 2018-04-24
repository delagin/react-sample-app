import * as React from 'react';

import { AppHeaderDark, AppHeaderLight } from '@common/components/AppHeader';
import { TMenu } from '@common/core/types';

import '@common/styles/_app.sass';

interface IAppLayoutProps {
  theme: 'dark' | 'light';
  menu?: TMenu;
  logoHref?: string;
  children?: React.ReactNode;
}

export const AppLayout = (
  { theme, children, menu, logoHref }: IAppLayoutProps,
) => (
  <section className={`app__layout app__layout--${theme}`}>
    <header className='app-header__container'>
      {theme === 'dark' && <AppHeaderDark logoHref={logoHref} />}
      {theme === 'light' && <AppHeaderLight logoHref={logoHref} menu={menu} />}
    </header>

    <div className='app__content'>
      {children}
    </div>
  </section>
);
