/**
 * Application Entry Point
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import HelloWorld from 'HelloWorld';

// tslint:disable-next-line:no-import-side-effect
import 'main.scss';

ReactDOM.render(
    <HelloWorld />,
    document.getElementsByClassName('starter-template')[0]
);

// Tell Typescript that there is a global variable called module
// tslint:disable-next-line
declare var module: { hot: any };

if (process.env.NODE_ENV !== 'production') {

    // Handle hot reloading requests from Webpack
    if (module.hot) {
        // tslint:disable-next-line
        const { AppContainer } = require('react-hot-loader');

        module.hot.accept(['./HelloWorld'], () => {
            // If we receive a HMR request for our App container, then reload it using require
            // (we can't do this dynamically with import)
            // tslint:disable-next-line
            const HelloWorld = require('./HelloWorld').default;

            ReactDOM.render(
                <AppContainer><HelloWorld /></AppContainer>,
                document.getElementsByClassName('starter-template')[0]
            );
        });
    }

}
