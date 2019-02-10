import React, { Component } from 'react';
import Lang from '../hoc/Lang';
import './style.scss';

class NotFound extends Component {
	render() {
		return (
			<div className="page_404">
				<div>
					<p>404</p>
					<p>
						<Lang>404.message</Lang>
					</p>
				</div>
			</div>
		);
	}
}

export default NotFound;
