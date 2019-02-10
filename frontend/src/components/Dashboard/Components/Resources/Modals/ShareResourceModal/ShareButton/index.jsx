import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import * as http from '../../../../../../../services/httpService';

class ShareButton extends Component {
	render() {
		return (
			<Tab.Pane>
				<kbd>
					{`<a href="${http.url}frame/file/${
						this.props.data.uuid
					}">AlBoom Resource</a>`}
				</kbd>
			</Tab.Pane>
		);
	}
}

export default ShareButton;
