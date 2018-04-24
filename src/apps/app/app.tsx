import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from '@app/components/App';

const render = (Component: React.StatelessComponent) => {
  ReactDOM.render(
    <Component />,
    document.querySelector('#app'),
  );
};

render(App);
