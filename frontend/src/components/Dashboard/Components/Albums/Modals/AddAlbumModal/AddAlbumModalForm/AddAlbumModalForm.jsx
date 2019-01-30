import React, { Component } from 'react';
import FormClass from '../../../../../../hoc/FormClass';
import { Modal, Form, Segment, Icon, Grid, Message } from 'semantic-ui-react';
import Lang from '../../../../../../hoc/Lang';
import * as lang from '../../../../../../../services/langService';
import _ from 'lodash';
import Joi from 'joi-browser';

class AddAlbumModalForm extends FormClass {
	state = {
		data: { email: '', password: '' },
		errors: {}
	};

	schema = {
		email: Joi.string()
			.email()
			.required()
			.label('Email'),
		password: Joi.string()
			.required()
			.label('Password')
	};

	render() {
		return (
			<React.Fragment>
				<Modal.Content scrolling>
					<Modal.Description>
						<Form onSubmit={this.handleSubmit} size="large">
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

							{/* <Grid columns={1} textAlign="center">
									<Button.Group fluid>
										<Button
											color="green"
											size="large"
											icon
											labelPosition="left"
											as={link}
											to="/"
										>
											<Icon name="arrow left" />
											<Lang>auth.login.back</Lang>
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
											<Lang>auth.login.button</Lang>
										</Button>
									</Button.Group>
								</Grid> */}
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
					</Modal.Description>
				</Modal.Content>
			</React.Fragment>
		);
	}
}

export default AddAlbumModalForm;
