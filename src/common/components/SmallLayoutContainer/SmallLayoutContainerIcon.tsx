import * as React from 'react';

interface ISmallLayoutContainerIconProps {
  icon: string;
}

export const SmallLayoutContainerIcon = (props: ISmallLayoutContainerIconProps) => (
  <div
    className={`
        small-layout-container__header-icon
        small-layout-container__header-icon-${props.icon}
      `}
  />
);
