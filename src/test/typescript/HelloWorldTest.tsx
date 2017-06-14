import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactTestUtils from "react-dom/test-utils";

import HelloWorld from "HelloWorld";

describe("HelloWorld", () => {
    test("should render some HTML", () => {
        // as React.ReactInstance is needed to silence some type error
        const helloWorld = ReactTestUtils.renderIntoDocument(<HelloWorld />) as React.ReactInstance;
        const helloWorldNode = ReactDOM.findDOMNode(helloWorld);

        expect(helloWorldNode.textContent).toContain("Hello from React!");
    });
});
