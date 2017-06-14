import * as React from "react";
import * as TestUtils from "react-addons-test-utils";
import * as ReactDOM from "react-dom";

import HelloWorld from "HelloWorld";

describe("HelloWorld", () => {
    test("should render some HTML", () => {
        // as React.ReactInstance is needed to silence some type error
        const helloWorld = TestUtils.renderIntoDocument(<HelloWorld />) as React.ReactInstance;
        const helloWorldNode = ReactDOM.findDOMNode(helloWorld);

        expect(helloWorldNode.textContent).toContain("Hello from React!");
    });
});
