import React, { Component } from 'react';
import Lang from '../hoc/Lang';

class NotFound extends Component {
	render() {
		return (
			<div>
				<p>404</p>
				<p>
					<Lang>404.message</Lang>
				</p>
			</div>
		);
	}
}

export default NotFound;
