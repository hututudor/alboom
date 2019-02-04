import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import Lang from '../Lang';

class Spinner extends Component {
	render() {
		return (
			<Dimmer active>
				<Loader size="huge">
					<Lang>loading.title</Lang>
				</Loader>
			</Dimmer>
		);
	}
}

export default Spinner;
