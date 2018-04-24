import * as React from 'react';
import { Button } from 'reactstrap';

interface IAppOverviewPanelUpdateButtonProps {
  outdated?: boolean;
  onClick?(evt: React.SyntheticEvent<HTMLButtonElement>): void;
}

export const AppOverviewPanelUpdateButton: React.StatelessComponent<
  IAppOverviewPanelUpdateButtonProps
> = ({ onClick, outdated }) => (
  <Button
    color={outdated ? 'warning' : 'primary'}
    size='sm'
    onClick={onClick}
  >
    {outdated ? 'Stale' : 'Up-to-date'}
  </Button>
);
