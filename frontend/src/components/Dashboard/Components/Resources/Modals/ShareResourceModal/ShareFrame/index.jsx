import React, { Component } from 'react';
import { TabPane, Tab } from 'semantic-ui-react';
import * as http from '../../../../../../../services/httpService';

class ShareFrame extends Component {
	render() {
		return (
			<Tab.Pane>
				<kbd>
					{`<iframe `}
					<br />
					{`src="${http.baseUrl}frame/file/${this.props.data.uuid}"`}
					<br />
					{'width="640px" height="360px>'}
					<br />
					{'AlBoom Frame</iframe>'}
				</kbd>
			</Tab.Pane>
		);
	}
}

export default ShareFrame;
