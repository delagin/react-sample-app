import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { PubApp } from '@pub/components/PubApp';

const render = (Component: React.StatelessComponent) => {
  ReactDOM.render(
    <Component />,
    document.querySelector('#app'),
  );
};

render(PubApp);
