import * as React from 'react';
import onClickOutside from 'react-onclickoutside';

import {
  AppHeaderLightNav,
  IMenuVisibility,
  TAppHeaderMenuSection,
} from '@common/components/AppHeader';
import { TMenu } from '@common/core/types';

interface IAppHeaderLightProps {
  menu?: TMenu;
  logoHref?: string;
}

interface IClickOutsideProps {
  disableOnClickOutside(): void;
  enableOnClickOutside(): void;
}

type TAppHeaderLightComponentProps = IAppHeaderLightProps & IClickOutsideProps;

interface IAppHeaderLightState {
  menuVisibility: IMenuVisibility;
}

class AppHeaderLightComponent extends React.Component<TAppHeaderLightComponentProps, IAppHeaderLightState> {
  constructor(props: TAppHeaderLightComponentProps) {
    super(props);

    const { menu } = props;

    this.state = {
      menuVisibility: {
        main: (menu && menu.main) ? menu.main.map(() => false) : [],
        settingsDropdown: false,
      },
    };
  }

  public handleClickOutside = () =>
    this.hideAll()

  public render() {
    const { logoHref, menu } = this.props;
    const { menuVisibility } = this.state;

    return (
      <AppHeaderLightNav
        menu={menu}
        logoHref={logoHref}
        menuVisibility={menuVisibility}
        onMenuItemClick={this.onMenuItemClick}
        onSubMenuItemClick={this.onSubMenuItemClick}
      />
    );
  }

  private onMenuItemClick = (section: TAppHeaderMenuSection, index?: number) =>
    () => {
      const { menuVisibility } = this.state;

      const newMenuVisibility = {
        ...menuVisibility,
      };

      switch (section) {
        case 'main': {
          newMenuVisibility.main = menuVisibility.main.map((__, ii) => ii === index);
          newMenuVisibility.settingsDropdown = false;
        } break;

        case 'settingsDropdown': {
          newMenuVisibility.main = menuVisibility.main.map(() => false);
          newMenuVisibility.settingsDropdown = true;
        } break;

        case 'logo':
        case 'secondary':
        default: {
          newMenuVisibility.main = menuVisibility.main.map(() => false);
          newMenuVisibility.settingsDropdown = false;
        } break;
      }

      this.setState({ menuVisibility: newMenuVisibility });
    }

  private onSubMenuItemClick = () =>
    () =>
      this.hideAll()

  private hideAll = () => {
    const { menu } = this.props;
    this.setState({
      menuVisibility: {
        main: (menu && menu.main) ? menu.main.map(() => false) : [],
        settingsDropdown: false,
      },
    });
  }
}

const AppHeaderLightWrapper = onClickOutside<{}>(AppHeaderLightComponent);

export const AppHeaderLight: React.StatelessComponent<IAppHeaderLightProps> =
  (props: IAppHeaderLightProps) => (
    <AppHeaderLightWrapper
      eventTypes={['click', 'touchend']}
      {...props}
    />
  );
