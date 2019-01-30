import React, { Component } from 'react';
import FormClass from '../../../../../../hoc/FormClass';
import {
	Modal,
	Form,
	Segment,
	Icon,
	Grid,
	Message,
	Select
} from 'semantic-ui-react';
import Lang from '../../../../../../hoc/Lang';
import * as lang from '../../../../../../../services/langService';
import _ from 'lodash';
import Joi from 'joi-browser';
import * as color from '../../../../../../../services/colorService';

class AddAlbumModalForm extends FormClass {
	state = {
		data: { name: '', color: '' },
		errors: {}
	};

	schema = {
		name: Joi.string()
			.required()
			.label('Name'),
		color: Joi.string()
			.required()
			.label('Color')
	};

	render() {
		return (
			<React.Fragment>
				<Modal.Content>
					<Modal.Description>
						<Form onSubmit={this.handleSubmit} size="large">
							<Form.Input
								fluid
								name="name"
								placeholder={lang.get('dashboard.albums.modals.add.name')}
								label={lang.get('dashboard.albums.modals.add.name')}
								onChange={this.handleChange}
								value={this.state.data.name}
								className={this.getClass('name')}
								type="email"
							/>

							<Form.Field>
								<Form.Field>
									<Lang>dashboard.albums.modals.add.color</Lang>
								</Form.Field>
								<Select
									fluid
									name="color"
									placeholder={lang.get('dashboard.albums.modals.add.color')}
									onChange={this.handleChange}
									value={this.state.data.color}
									className={this.getClass('color')}
									options={color.colorSelect}
								/>
							</Form.Field>

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
