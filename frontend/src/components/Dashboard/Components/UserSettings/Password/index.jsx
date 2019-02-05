import React, { Component } from 'react';
import PasswordForm from './PasswordForm';
import { Container } from 'semantic-ui-react';

class Password extends Component {
	render() {
		return (
			<Container>
				<PasswordForm />
			</Container>
		);
	}
}

export default Password;
