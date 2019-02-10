import React, { Component } from 'react';
import FormClass from '../../../../../hoc/FormClass';
import Joi from 'joi-browser';
import Lang from '../../../../../hoc/Lang';
import * as lang from '../../../../../../services/langService';
import { Form, Message, Segment, Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import * as notification from '../../../../../../services/notificationService';
import * as color from '../../../../../../services/colorService';
import * as auth from '../../../../../../services/authService';
import * as preference from '../../../../../../services/preferencesService';
import actions from '../../../../../../redux/actions';
import { connect } from 'react-redux';

class BasicForm extends FormClass {
	state = {
		data: {
			name: '',
			theme: ''
		},
		errors: {}
	};

	schema = {
		name: Joi.string()
			.required()
			.label('Name'),
		theme: Joi.string()
			.required()
			.label('Theme')
	};

	componentDidMount() {
		this.setState({
			data: {
				name: this.props.user.name,
				theme: this.props.user.preferences.theme
			}
		});
	}

	doSubmit = () => {
		let user = { ...this.props.user };
		user.name = this.state.data.name;
		user.preferences.theme = this.state.data.theme;

		auth
			.changeName(this.state.data.name)
			.then(res => {
				preference
					.changePreference('theme', this.state.data.theme)
					.then(res => {
						notification.success('dashboard.user.basic.success');
						this.props.updateUser(user);
					})
					.catch(err => {
						console.error(err);
						notification.error();
					});
			})
			.catch(err => {
				console.error(err);
				notification.error();
			});
	};

	render() {
		return (
			<React.Fragment>
				<Form onSubmit={this.handleSubmit} size="large">
					<Form.Input
						fluid
						name="name"
						placeholder={lang.get('dashboard.user.basic.name')}
						label={lang.get('dashboard.user.basic.name')}
						onChange={this.handleChange}
						value={this.state.data.name}
						className={this.getClass('name')}
						type="text"
					/>
					<Form.Field>
						<Form.Field>
							<Lang>dashboard.user.basic.theme</Lang>
						</Form.Field>
						<select
							className="ui fluid dropdown"
							name="theme"
							onChange={this.handleChange}
							value={this.state.data.theme}
							className={this.getClass('theme')}
						>
							{color.colors.map((color, index) => (
								<option key={index} value={color}>
									{color.charAt(0).toUpperCase() + color.slice(1)}
								</option>
							))}
						</select>
					</Form.Field>
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

const mapStateToProps = state => {
	return {
		user: state.auth.user
	};
};

const mapDispatchToProps = dispatch => {
	return {
		updateUser: user => dispatch(actions.auth.updateUser(user))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BasicForm);
