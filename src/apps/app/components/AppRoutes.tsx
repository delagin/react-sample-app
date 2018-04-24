import * as React from 'react';
import { Route } from 'react-router-dom';

import { ETMenuSectionName, TMenu, TMenuSection } from '@common/core/types';

/**
 * Add routes from menu
 * @param section Menu section to add
 * @param routes flatten routes map
 */
const addRouteComponent = (section: TMenuSection, routes: React.ReactNode[]) => {
  section.forEach(({ component: Component, link, items }) => {
    if (link && Component) {
      routes.push(
        <Route key={routes.length - 1} path={link} component={Component} />,
      );
    }

    if (items && items.length) {
      addRouteComponent(items, routes);
    }
  });
};

/**
 * AppRoutes is fabric of <Route path=... component=.../> picked from menu.
 * @param menu application menu
 */
export const AppRoutes = (menu: TMenu): React.ReactNode[] => {
  const routes: React.ReactNode[] = [];

  Object.keys(ETMenuSectionName)
    .forEach(
      (section: ETMenuSectionName) => menu[section] && addRouteComponent(menu[section], routes),
    );

  return routes;
};
