import React from 'react';

export interface IAppPopupAPI {
  show(data?: any): void;
  toggle(): void;
  isOpen(): boolean;
}

export interface IAppPopupProps {
  children(popupApi: IAppPopupAPI, data:any): React.ReactNode | null;
  apiRef?(popupApi: IAppPopupAPI): void;
}

interface IAppPopupState {
  isOpen: boolean;
  data: any;
}

export class AppPopup extends React.Component<IAppPopupProps, IAppPopupState> {
  public popupApi: IAppPopupAPI = {
    show: (data: any) => this.setState({
      data,
      isOpen: true,
    }),
    isOpen: () => this.state.isOpen,
    toggle: () => this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    })),
  };

  constructor(props: IAppPopupProps) {
    super(props);

    this.state = {
      isOpen: false,
      data: null,
    };
  }

  public componentDidMount() {
    const { apiRef } = this.props;

    if (apiRef) {
      apiRef(this.popupApi);
    }
  }

  public render() {
    const { children } = this.props;
    const { data } = this.state;

    return children(this.popupApi, data);
  }
}
