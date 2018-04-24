import * as React from 'react';

import { SmallLayoutContainerHeader, SmallLayoutContainerIcon } from '@common/components/SmallLayoutContainer';
import '@common/styles/components/small-layout-container.sass';

interface ISmallLayoutContainerProps {
  infoPanelText?: string;
  title?: string;
  headerIcon?: string;
  children?: React.ReactNode;
  className?: string;
}

export const SmallLayoutContainer: React.StatelessComponent<ISmallLayoutContainerProps> = ({
  infoPanelText,
  headerIcon,
  title,
  children,
  className,
}) => (
  <div className={`small-layout-container ${className || ''}`}>
    {(infoPanelText && infoPanelText !== '') &&
      <SmallLayoutContainerHeader title={infoPanelText} />
    }

    {(headerIcon && headerIcon !== '') &&
      <SmallLayoutContainerIcon icon={headerIcon} />
    }

    {(title && title !== '') &&
      <h5 className='small-layout-container__header-title'>
        {title}
      </h5>
    }

    <div className='small-layout-container__content'>
      {children}
    </div>
  </div>
);
