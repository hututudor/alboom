import React from 'react';
import Joi from 'joi-browser';
import FormClass from '../../hoc/FormClass';
import {
	Grid,
	Header,
	Message,
	Segment,
	Button,
	Form,
	Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../style.scss';
import Logo from '../../hoc/Logo';
import Lang from '../../hoc/Lang';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import * as auth from '../../../services/authService';
import { toast } from 'react-toastify';
import * as lang from '../../../services/langService';

class Register extends FormClass {
	state = {
		data: { name: '', email: '', password: '' },
		errors: {},
		showPassword: false
	};

	schema = {
		name: Joi.string()
			.required()
			.label('Name'),
		email: Joi.string()
			.email()
			.required()
			.label('Email'),
		password: Joi.string()
			.required()
			.min(6)
			.max(30)
			.label('Password')
	};

	doSubmit = () => {
		this.setState({ loading: true });
		auth
			.register({
				name: this.state.data.name,
				email: this.state.data.email,
				password: this.state.data.password
			})
			.then(res => {
				this.props.updateUser(res.data.user, res.data.token);
				this.props.history.push('/');
			})
			.catch(err => {
				if (err.response) {
					if (err.response.data.email) {
						toast.error(lang.get('auth.messages.taken'));
					}
				}
				this.setState({ loading: false });
			});
	};

	toogleShowPassword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};

	render() {
		return (
			<Grid textAlign="center" verticalAlign="middle" className="auth">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h1" icon color="orange" textAlign="center">
						<Logo size={40} />
						<br />
						<Lang>auth.register.title</Lang>
					</Header>
					<Form onSubmit={this.handleSubmit} size="large">
						<Segment stacked>
							<Form.Input
								fluid
								name="name"
								icon="user"
								iconPosition="left"
								placeholder={lang.get('auth.placeholders.name')}
								onChange={this.handleChange}
								value={this.state.data.name}
								className={this.getClass('name')}
								type="text"
							/>
							<Form.Input
								fluid
								name="email"
								icon="mail"
								iconPosition="left"
								placeholder={lang.get('auth.placeholders.email')}
								onChange={this.handleChange}
								value={this.state.data.email}
								className={this.getClass('email')}
								type="email"
							/>

							<Form.Input
								fluid
								name="password"
								icon="lock"
								iconPosition="left"
								placeholder={lang.get('auth.placeholders.password')}
								onChange={this.handleChange}
								value={this.state.data.password}
								className={this.getClass('password')}
								type="password"
							/>
							<br />

							<Grid columns={1} textAlign="center">
								<Button.Group fluid>
									<Button
										color="green"
										size="large"
										icon
										labelPosition="left"
										as={Link}
										to="/"
									>
										<Icon name="arrow left" />
										<Lang>auth.register.back</Lang>
									</Button>
									<Button
										disabled={this.state.loading}
										className={this.state.loading ? 'loading' : ''}
										color="orange"
										size="large"
										icon
										labelPosition="right"
									>
										<Icon name="arrow right" />
										<Lang>auth.register.button</Lang>
									</Button>
								</Button.Group>
							</Grid>
						</Segment>
					</Form>
					{_.isEmpty(this.state.errors) ? (
						''
					) : (
						<Message error>
							<h3>Error</h3>
							{this.displayErrors()}
						</Message>
					)}
					<Message>
						<Lang>auth.register.message</Lang>{' '}
						<Link to="/login">
							<Lang>auth.register.login</Lang>
						</Link>
					</Message>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateUser: (user, token) => dispatch(actions.auth.updateUser(user, token))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Register);
