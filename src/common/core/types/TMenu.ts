import * as React from 'react';

export type TRoles = string[];

export type TMenuItem = {
  label: string;
  link?: string;
  href?: string;
  forRoles?: string[];
  component?: React.ComponentType<any>;
};

export type TMenuSectionItem = TMenuItem & {items?: TMenuItem[]};

export type TMenuSection = TMenuSectionItem[];

export enum ETMenuSectionName {
  main = 'main',
  settingsDropdown = 'settingsDropdown',
  secondary = 'secondary',
}

export type TMenu = {
  [TMenuSectionName in ETMenuSectionName]: TMenuSection;
};
