import React from "react";
import { render } from "react-dom";
import { AppContainer } from 'react-hot-loader';

import "main.scss";

import Hello from './Hello';

// Get the DOM Element that will host our React application
const rootEl = document.getElementById('react-app');

render(
    <Hello compiler='Javascript' framework='React' />,
    rootEl,
);

if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
   const orgError = console.error; // eslint-disable-line no-console
   console.error = (message) => { // eslint-disable-line no-console
     if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
       // Log the error as normally
       orgError.apply(console, [message]);
     }
   };

  module.hot.accept('./Hello', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./Hello').default;

    render(
      <AppContainer errorReporter={Redbox}>
        <NextApp compiler='Javascript' framework='React' />
      </AppContainer>,
      rootEl
    );
  });
}
