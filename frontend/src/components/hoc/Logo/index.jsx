import React, { Component } from 'react';
import './style.scss';

class Logo extends Component {
	render() {
		return (
			<span className="logo" style={{ fontSize: this.props.size }}>
				<span>Al</span>Boom
			</span>
		);
	}
}

Logo.defaultProps = {
	size: 16
};

export default Logo;
