import * as React from 'react';

import {
  AppHeaderLogo,
  AppHeaderMenuItem,
} from '@common/components/AppHeader';
import { TMenu } from '@common/core/types';

export interface IMenuVisibility {
  main: boolean[];
  settingsDropdown: boolean;
}

export type TAppHeaderMenuSection = 'main' | 'settingsDropdown' | 'secondary' | 'logo';

interface IAppHeaderLightNavProps {
  menu?: TMenu;
  menuVisibility: IMenuVisibility;
  logoHref?: string;
  onMenuItemClick(section: TAppHeaderMenuSection, index?: number): () => void;
  onSubMenuItemClick(): () => void;
}

export const AppHeaderLightNav: React.StatelessComponent<IAppHeaderLightNavProps> = ({
  menu,
  menuVisibility,
  onMenuItemClick,
  onSubMenuItemClick,
  logoHref,
}) => (
  <nav className='app-header__inner'>
    {menu && menu.secondary && menu.secondary.length && (
      <div className='app-header__inner_secondary'>
        <div className='app-header__logo-container'>
          <AppHeaderLogo logoType='svg' href={logoHref} />
        </div>

        <ul className='app-header__menu p-0'>
          {menu.secondary.map(({ link, label, href }, key) => (
            <AppHeaderMenuItem
              key={key}
              linkTo={link}
              href={href}
              onClick={onMenuItemClick('secondary')}
            >
              {label}
            </AppHeaderMenuItem>
          ))}
        </ul>
      </div>
    )}

    <div className='app-header__inner_primary'>
      <ul className='app-header__menu'>
        {menu && menu.main && menu.main.map(({ link, label, items, href }, key) => (
          !items ? (
            <AppHeaderMenuItem
              key={key}
              linkTo={link}
              href={href}
              onClick={onMenuItemClick('logo')}
            >
              {label}
            </AppHeaderMenuItem>
          ) : (
              <AppHeaderMenuItem
                key={key}
                dropdown={true}
                isOpened={menuVisibility.main[key]}
              >
                <div
                  role='button'
                  className='app-header__menu_item_link'
                  onClick={onMenuItemClick('main', key)}
                >
                  {label}
                </div>

                <ul className='app-header__dropdown_list'>
                  {items.map(({ link: subItemLink, label: subItemLabel }, subItemKey) => (
                    <AppHeaderMenuItem
                      key={subItemKey}
                      linkTo={subItemLink}
                      onClick={onSubMenuItemClick()}
                    >
                      {subItemLabel}
                    </AppHeaderMenuItem>
                  ))}
                </ul>
              </AppHeaderMenuItem>
            )))}
      </ul>

      <div className='w-100' />

      {menu && menu.settingsDropdown && menu.settingsDropdown.length && (
        <div className='app-header__menu p-0'>
          <AppHeaderMenuItem
            dropdown={true}
            isOpened={menuVisibility.settingsDropdown}
            className='app-header__menu_toggle'
          >
            <div
              role='button'
              className='app-header__menu_item_link'
              onClick={onMenuItemClick('settingsDropdown')}
            >
              Settings
            </div>

            <ul className='app-header__dropdown_list'>
              {menu.settingsDropdown.map(({ label, link, href }, key) => (
                <AppHeaderMenuItem
                  key={key}
                  linkTo={link}
                  href={href}
                  onClick={onSubMenuItemClick()}
                >
                  {label}
                </AppHeaderMenuItem>
              ))}
            </ul>
          </AppHeaderMenuItem>
        </div>
      )}
    </div>
  </nav>
);
