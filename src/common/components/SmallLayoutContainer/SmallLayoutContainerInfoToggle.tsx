import * as React from 'react';

import { Col, Row } from 'reactstrap';

interface ISmallLayoutContainerInfoToggleProps {
  title(isToggled: boolean): React.ReactNode;
  children(isToggled: boolean): React.ReactNode;
}

interface ISmallLayoutContainerInfoToggleState {
  infoOpened: boolean;
}

export class SmallLayoutContainerInfoToggle extends
  React.Component<ISmallLayoutContainerInfoToggleProps, ISmallLayoutContainerInfoToggleState> {

  public state = {
    infoOpened: false,
  };

  public render() {
    const { infoOpened } = this.state;
    const { title, children } = this.props;

    return (
      <div>
        <Row className='small-layout-container__info-toggle-header'>
          <Col className='pr-0'>
            <h4>{title(infoOpened)}</h4>
          </Col>

          <Col xs={{ size: 'auto' }}>
            <div
              role='button'
              onClick={this.onInfoPanelToggle}
              className='small-layout-container__info-toggle-icon'
            >
              <span className='fa-stack fa-stack-sm'>
                <i className='fa fa-square-o fa-stack-2x' />

                {infoOpened ? (
                  <i className='fa fa-chevron-left fa-stack-1x' />
                ) : (
                  <i className='fa fa-info fa-stack-1x' />
                )}
              </span>
            </div>
          </Col>
        </Row>

        <div>
          {children(infoOpened)}
        </div>
      </div>
    );
  }

  private onInfoPanelToggle = () =>
    this.setState(({ infoOpened }) => ({ infoOpened: !infoOpened }))
}
