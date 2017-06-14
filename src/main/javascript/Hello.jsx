import React from 'react';

export default class Hello extends React.Component {
	render() {
		return (
			<div>Hello from {this.props.compiler} and {this.props.framework}!</div>
		);
	}
}
