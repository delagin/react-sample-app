import * as React from 'react';

import '@app/styles/app-panel.sass';

interface IAppPanelProps {
  children: React.ReactNode;
}

export const AppPanel = ({ children }: IAppPanelProps) => (
  <div className='app-panel'>
    {children}
  </div>
);
