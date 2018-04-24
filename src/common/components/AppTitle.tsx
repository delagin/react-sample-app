/**
 * AppTitle component just updates HTML <title></title> tag
 * inner by props
 */

import * as React from 'react';

interface IAppTitleProps {
  append?: string;
  title?: string;
  children?: any;
}

export class AppTitle extends React.Component<IAppTitleProps> {
  private $title: HTMLTitleElement;

  public componentWillMount() {
    this.$title = document.querySelector('title') as HTMLTitleElement;
    this.updateTitle();
  }

  public componentWillUpdate() {
    this.updateTitle();
  }

  public render() {
    // No own to render here. Instead, just change <title></title>
    // tag text within this.updateTitle();
    return this.props.children || '';
  }

  private updateTitle() {
    const title = this.props.title || '';
    const append = this.props.append || '';
    if (this.$title) {
      this.$title.innerText =
        title ? title : `Axmit - ${append}`;
    }
  }
}
