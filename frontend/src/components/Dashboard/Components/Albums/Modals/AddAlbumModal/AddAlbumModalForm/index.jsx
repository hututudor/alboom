import React, { Component } from 'react';
import FormClass from '../../../../../../hoc/FormClass';
import { Modal, Form, Icon, Message, Button } from 'semantic-ui-react';
import Lang from '../../../../../../hoc/Lang';
import * as lang from '../../../../../../../services/langService';
import _ from 'lodash';
import Joi from 'joi-browser';
import * as color from '../../../../../../../services/colorService';
import { connect } from 'react-redux';
import actions from '../../../../../../../redux/actions';
import * as album from '../../../../../../../services/albumsService';
import * as notification from '../../../../../../../services/notificationService';

class AddAlbumModalForm extends FormClass {
	state = {
		data: {
			name: '',
			color: '',
			public: true,
			controls: true,
			autoplay: false
		},
		errors: {}
	};

	schema = {
		name: Joi.string()
			.required()
			.label('Name'),
		color: Joi.string()
			.required()
			.label('Color'),
		public: Joi.boolean()
			.required()
			.label('Public'),
		controls: Joi.boolean()
			.required()
			.label('Controls'),
		autoplay: Joi.boolean()
			.required()
			.label('Autoplay')
	};

	closeModal = () => {
		this.props.closeModal();
	};

	doSubmit = () => {
		album
			.add({
				name: this.state.data.name,
				color: this.state.data.color,
				public: this.state.data.public ? 1 : 0,
				controls: this.state.data.controls ? 1 : 0,
				autoplay: this.state.data.autoplay ? 1 : 0
			})
			.then(res => {
				this.props.addAlbum(res.data.album);
				notification.success('messages.album.add');
				this.closeModal();
			})
			.catch(err => {
				console.log(err);
				notification.error();
			});
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
								placeholder={lang.get('dashboard.albums.modals.all.name')}
								label={lang.get('dashboard.albums.modals.all.name')}
								onChange={this.handleChange}
								value={this.state.data.name}
								className={this.getClass('name')}
								type="text"
							/>

							<Form.Field>
								<Form.Field>
									<Lang>dashboard.albums.modals.all.color</Lang>
								</Form.Field>
								<select
									className="ui fluid dropdown"
									name="color"
									onChange={this.handleChange}
									value={this.state.data.color}
									className={this.getClass('color')}
								>
									{color.colors.map((color, index) => (
										<option key={index} value={color}>
											{color.charAt(0).toUpperCase() + color.slice(1)}
										</option>
									))}
								</select>

								{/* <Select
                  fluid
                  name="color"
                  placeholder={lang.get('dashboard.albums.modals.add.color')}
                  onChange={this.handleChange}
                  value={this.state.data.color}
                  className={this.getClass('color')}
                  options={color.colorSelect}
                /> */}
							</Form.Field>

							<div className="ui toggle checkbox">
								<input
									type="checkbox"
									name="public"
									onChange={this.handleChange}
									checked={this.state.data.public}
									className={this.getClass('public')}
								/>
								<label>
									<Lang>dashboard.albums.modals.all.public</Lang>
								</label>
							</div>

							<br />

							<h3>
								<Lang>dashboard.albums.modals.all.settings</Lang>
							</h3>

							<div className="ui toggle checkbox">
								<input
									type="checkbox"
									name="controls"
									onChange={this.handleChange}
									checked={this.state.data.controls}
									className={this.getClass('controls')}
								/>
								<label>
									<Lang>dashboard.albums.modals.all.controls</Lang>
								</label>
							</div>

							<br />
							<br />

							<div className="ui toggle checkbox">
								<input
									type="checkbox"
									name="autoplay"
									onChange={this.handleChange}
									checked={this.state.data.autoplay}
									className={this.getClass('autoplay')}
								/>
								<label>
									<Lang>dashboard.albums.modals.all.autoplay</Lang>
								</label>
							</div>
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
						<Icon name="plus" />
						<Lang>actions.add</Lang>
					</Button>
				</Modal.Actions>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => dispatch(actions.modals.toggleModal('addAlbums', false)),
		addAlbum: album => dispatch(actions.albums.addAlbum(album))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(AddAlbumModalForm);
