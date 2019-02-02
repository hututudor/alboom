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
import * as resource from '../../../../../../../services/resourcesService';
import * as notification from '../../../../../../../services/notificationService';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';
import File from './File';

class AddResourceModalForm extends FormClass {
	state = {
		files: [],
		stats: {}
	};

	closeModal = () => {
		this.props.closeModal();
	};

	add = () => {
		this.state.files.map(file => {
			let index = this.state.files.indexOf(file);
			// console.log(file);
			let data = new FormData();
			data.append('location', file, file.name);
			resource
				.add(this.props.uuid, data)
				.then(res => {
					console.log(res);
					notification.success('messages.resource.add');
					let stats = { ...this.state.stats };
					stats[index] = 1;
					this.setState({ stats });
					this.props.addResource(res.data.resource);

					setTimeout(() => {
						this.removeItem(file);
					}, 2000);
				})
				.catch(err => {
					console.error(err);
					notification.errorN('messages.resource.adderror');
					let stats = { ...this.state.stats };
					stats[index] = 2;
					this.setState({ stats });
				});
		});
	};

	onDrop = (acceptedFiles, rejectedFiles) => {
		this.setState({
			files: this.state.files.concat(acceptedFiles)
		});
	};

	removeItem = file => {
		let index = this.state.files.indexOf(file);
		let st = { ...this.state };
		st.files.splice(index, 1);

		let sts = { ...this.state };
		sts.stats[index] = 0;

		this.setState({ files: st.files, stats: sts.stats });
	};

	render() {
		return (
			<React.Fragment>
				<Modal.Content>
					<Modal.Description>
						<Dropzone onDrop={this.onDrop}>
							{({ getRootProps, getInputProps, isDragActive }) => {
								return (
									<div
										{...getRootProps()}
										className={classNames('dropzone', {
											'dropzone--isActive': isDragActive
										})}
									>
										<input {...getInputProps()} />
										{isDragActive ? (
											<p>
												<Lang>dashboard.resources.modals.add.drop.on</Lang>
											</p>
										) : (
											<p>
												<Lang>dashboard.resources.modals.add.drop.off</Lang>
											</p>
										)}
									</div>
								);
							}}
						</Dropzone>
					</Modal.Description>
					{this.state.files.map((file, index) => (
						<File
							key={index}
							data={file}
							index={index}
							onDelete={this.removeItem}
							stat={this.state.stats[index]}
						/>
					))}
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
						onClick={() => this.add()}
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
		closeModal: () =>
			dispatch(actions.modals.toggleModal('addResources', false)),
		addResource: resource => dispatch(actions.resources.addResource(resource))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(AddResourceModalForm);
