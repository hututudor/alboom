import React, { Component } from 'react';
import FormClass from '../../../../../hoc/FormClass';
import Joi from 'joi-browser';
import Lang from '../../../../../hoc/Lang';
import * as lang from '../../../../../../services/langService';
import { Form, Message, Segment, Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import * as auth from '../../../../../../services/authService';
import * as notification from '../../../../../../services/notificationService';

class PasswordForm extends FormClass {
	state = {
		data: {
			new: '',
			password: ''
		},
		errors: {}
	};

	schema = {
		password: Joi.string()
			.required()
			.label('New'),
		new: Joi.string()
			.required()
			.min(6)
			.label('Password')
	};

	doSubmit = () => {
		auth
			.changePassword(this.state.data.password, this.state.data.new)
			.then(res => {
				notification.success('dashboard.user.password.success');
				this.setState({
					data: {
						new: '',
						password: ''
					}
				});
			})
			.catch(err => {
				console.error(err);
				notification.errorN('dashboard.user.password.error');
			});
	};

	render() {
		return (
			<React.Fragment>
				<Form onSubmit={this.handleSubmit} size="large">
					<Form.Input
						fluid
						name="password"
						placeholder={lang.get('dashboard.user.password.password')}
						label={lang.get('dashboard.user.password.password')}
						onChange={this.handleChange}
						value={this.state.data.password}
						className={this.getClass('password')}
						type="password"
					/>
					<Form.Input
						fluid
						name="new"
						placeholder={lang.get('dashboard.user.password.new')}
						label={lang.get('dashboard.user.password.new')}
						onChange={this.handleChange}
						value={this.state.data.new}
						className={this.getClass('new')}
						type="password"
					/>
				</Form>
				{_.isEmpty(this.state.errors) ? (
					''
				) : (
					<Message error>
						<h3>
							<Lang>auth.errors</Lang>
						</h3>
						{this.displayErrors()}
					</Message>
				)}

				<div style={{ textAlign: 'right', marginTop: '.6em' }}>
					<Button
						labelPosition="right"
						icon
						positive
						onClick={event => this.handleSubmit(event)}
					>
						<Icon name="save" />
						<Lang>actions.update</Lang>
					</Button>
				</div>
			</React.Fragment>
		);
	}
}

export default PasswordForm;
