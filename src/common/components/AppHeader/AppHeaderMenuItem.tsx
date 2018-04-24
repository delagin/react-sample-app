import * as React from 'react';
import { Link } from 'react-router-dom';

interface IAppHeaderMenuItemProps {
  linkTo?: string;
  href?: string;
  children: React.ReactNode;
  dropdown?: boolean;
  className?: string;
  isOpened?: boolean;
  onClick?(evt: React.SyntheticEvent<HTMLElement>): void;
}

export const AppHeaderMenuItem = ({
  linkTo,
  href,
  children,
  dropdown,
  className,
  isOpened,
  onClick,
}: IAppHeaderMenuItemProps) => (
    <li
      className={classNameByOptions(dropdown, className, isOpened)}
      role='menuitem'
      onClick={onClick}
    >
      {linkTo != null ?
        <Link to={linkTo} className='app-header__menu_item_link' >
          {children}
        </Link>
        :
        (href != null ?
          <a href={href} className='app-header__menu_item_link'>
            {children}
          </a>
          :
          children
        )
      }
    </li>
  );

const classNameByOptions = (dropdown?: boolean, className?: string, isOpened?: boolean): string =>
  [
    'app-header__menu_item',
    dropdown && ' app-header__dropdown' || '',
    className && ` ${className}` || '',
    isOpened && ' app-header__menu_item--active' || '',
  ].join('');
