import * as React from 'react';

import { AppHeaderLogo } from '@common/components/AppHeader';

interface IAppHeaderDarkProps {
  logoHref?: string;
}

export const AppHeaderDark = ({ logoHref }: IAppHeaderDarkProps) => (
  <div className='app-header app-header--dark'>
    <AppHeaderLogo logoType='svg' href={logoHref}/>
  </div>
);
