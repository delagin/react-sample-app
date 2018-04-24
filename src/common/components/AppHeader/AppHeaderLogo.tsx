import * as React from 'react';

export type TLogoType = 'svg' | 'png';

const logoSrcs: { [ key: string ]: string } = {
  svg: require('@common/assets/images/axmit-logo.svg'),
  png: require('@common/assets/images/axmit-logo.png'),
};

interface IAppHeaderLogoProps {
  logoType: TLogoType;
  href?: string;
}

export const AppHeaderLogo: React.StatelessComponent<IAppHeaderLogoProps> = ({
  logoType = 'svg',
  href = '/',
}) => (
  <a href={href}>
    <img src={logoSrcs[logoType]} className={`app-header__logo--${logoType}`} alt='Axmit Logo' />
  </a>
);
