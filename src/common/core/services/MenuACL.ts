/**
 * Utils for ACL menu hiding
 */

import { TMenu, TMenuSection, TMenuSectionItem, TRoles } from '@common/core/types';

export const sectionAllowedForRoles = (section: TMenuSectionItem, roles: TRoles): boolean => (
  section.forRoles ?
    section.forRoles.some(role => roles.indexOf(role) >= 0) :
    true
);

/**
 * Filter single menu section for user by roles
 * @param section single menu section to filter
 * @param roles user roles
 */
export const filterMenuSectionForRoles = (section: TMenuSection, roles: TRoles): TMenuSection => (
  section
    .filter(ss => sectionAllowedForRoles(ss, roles))
    .map(ss => !ss.items ?
      ss :
      { ...ss, items: filterMenuSectionForRoles(ss.items, roles) },
    )
);

/**
 * Filter whole menu for user by roles
 * @param menu menu sctucture with sections
 * @param roles user roles
 */
export const filterMenuForRoles = (menu: TMenu, roles: TRoles): TMenu => ({
  main            : menu.main && filterMenuSectionForRoles(menu.main, roles),
  secondary       : menu.secondary && filterMenuSectionForRoles(menu.secondary, roles),
  settingsDropdown: menu.settingsDropdown && filterMenuSectionForRoles(menu.settingsDropdown, roles),
});
