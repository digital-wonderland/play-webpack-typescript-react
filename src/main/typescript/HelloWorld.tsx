/**
 * The HelloWorld Component
 */

import * as React from 'react';

// Jest doesn't work with stateless functional components - ReactDOM.findDOMNode returns null
// see https://github.com/facebook/react/issues/4839
// export default () => <h1>Hello from React!</h1>;

// tslint:disable-next-line:no-default-export
export default class HelloWorld extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return <h1>Hello from React!</h1>;
    }

}
