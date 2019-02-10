import React, { Component } from 'react';
import FormClass from '../../../../../../hoc/FormClass';
import { Modal, Form, Icon, Message, Button } from 'semantic-ui-react';
import Lang from '../../../../../../hoc/Lang';
import * as lang from '../../../../../../../services/langService';
import _ from 'lodash';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import actions from '../../../../../../../redux/actions';
import * as transition from '../../../../../../../services/transitionService';
import * as resource from '../../../../../../../services/resourcesService';
import * as notification from '../../../../../../../services/notificationService';
import * as file from '../../../../../../../services/fileTypesService';

class EditResourceModalForm extends FormClass {
	state = {
		data: {
			name: '',
			transition: '',
			loop: false,
			mute: false,
			muted: false
		},
		errors: {}
	};

	schema = {
		name: Joi.string()
			.required()
			.label('Name'),
		transition: Joi.string()
			.required()
			.label('Color'),
		loop: Joi.boolean()
			.required()
			.label('Public'),
		mute: Joi.boolean()
			.required()
			.label('Controls'),
		muted: Joi.boolean()
			.required()
			.label('Autoplay')
	};

	componentDidMount() {
		this.setState({
			data: {
				name: this.props.options.name,
				transition: this.props.options.transition,
				loop: this.props.options.loop === 1 ? true : false,
				mute: this.props.options.mute === 1 ? true : false,
				muted: this.props.options.muted === 1 ? true : false
			}
		});
	}

	closeModal = () => {
		this.props.closeModal();
	};

	doSubmit = () => {
		resource
			.edit({
				name: this.state.data.name,
				transition: this.state.data.transition,
				loop: this.state.data.loop ? 1 : 0,
				mute: this.state.data.mute ? 1 : 0,
				muted: this.state.data.muted ? 1 : 0,
				uuid: this.props.options.uuid
			})
			.then(res => {
				this.props.editResource(this.props.options.uuid, res.data.resource);
				notification.success('messages.resource.edit');
				this.closeModal();
			})
			.catch(err => {
				notification.error();
			});
	};

	isImage = () => {
		if (file.types.image.includes(this.props.options.type)) {
			return true;
		} else {
			return false;
		}
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
								placeholder={lang.get('dashboard.resources.modals.all.name')}
								label={lang.get('dashboard.resources.modals.all.name')}
								onChange={this.handleChange}
								value={this.state.data.name}
								className={this.getClass('name')}
								type="text"
							/>

							<Form.Field>
								<Form.Field>
									<Lang>dashboard.resources.modals.all.transition</Lang>
								</Form.Field>
								<select
									className="ui fluid dropdown"
									name="transition"
									onChange={this.handleChange}
									value={this.state.data.transition}
									className={this.getClass('transition')}
								>
									{transition.transitions.map((transition, index) => (
										<option key={index} value={transition}>
											{transition.charAt(0).toUpperCase() + transition.slice(1)}
										</option>
									))}
								</select>
							</Form.Field>

							{this.isImage() ? (
								''
							) : (
								<React.Fragment>
									<h3>
										<Lang>dashboard.resources.modals.all.settings</Lang>
									</h3>

									<div className="ui toggle checkbox">
										<input
											type="checkbox"
											name="loop"
											onChange={this.handleChange}
											checked={this.state.data.loop}
											className={this.getClass('loop')}
										/>
										<label>
											<Lang>dashboard.resources.modals.all.loop</Lang>
										</label>
									</div>

									<br />
									<br />

									<div className="ui toggle checkbox">
										<input
											type="checkbox"
											name="mute"
											onChange={this.handleChange}
											checked={this.state.data.mute}
											className={this.getClass('mute')}
										/>
										<label>
											<Lang>dashboard.resources.modals.all.mute</Lang>
										</label>
									</div>

									<br />
									<br />

									{/* <div className="ui toggle checkbox">
										<input
											type="checkbox"
											name="muted"
											onChange={this.handleChange}
											checked={this.state.data.muted}
											className={this.getClass('muted')}
										/>
										<label>
											<Lang>dashboard.resources.modals.all.muted</Lang>
										</label>
									</div> */}
								</React.Fragment>
							)}
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
				<Modal.Actions>
					<Button
						labelPosition="left"
						icon
						negative
						onClick={() => this.closeModal()}
					>
						<Icon name="remove" />
						<Lang>actions.cancel</Lang>
					</Button>
					<Button
						labelPosition="right"
						icon
						positive
						onClick={event => this.handleSubmit(event)}
					>
						<Icon name="save" />
						<Lang>actions.update</Lang>
					</Button>
				</Modal.Actions>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		options: state.modals.editResourcesOptions
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		closeModal: () =>
			dispatch(actions.modals.toggleModal('editResources', false)),
		editResource: (uuid, resource) =>
			dispatch(actions.resources.editResource(uuid, resource))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditResourceModalForm);
