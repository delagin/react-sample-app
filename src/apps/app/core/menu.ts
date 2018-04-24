import { TMenu } from '@common/core/types';

import { AppOverviewPanel } from '@app/components/AppOverviewPanel';

export const menu: TMenu = {
  main: [{
    label: 'Overview',
    link: '/app/overview',
    component: AppOverviewPanel,
  }],

  settingsDropdown: [],

  secondary: [{
    label: 'Logout',
    href: '/login?action=logout',
  }],
};
