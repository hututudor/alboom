import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../../../redux/actions';
import { Image, Modal, Header, Button, Icon } from 'semantic-ui-react';
import Lang from '../../../../../hoc/Lang/index';
import * as resources from '../../../../../../services/resourcesService';
import { toast } from 'react-toastify';

class DeleteAlbumModal extends Component {
	closeModal = () => {
		this.props.closeModal();
	};

	deleteResource = () => {
		let uuid = this.props.options.uuid;

		resources
			.remove(uuid)
			.then(res => {
				this.props.deleteResource(uuid);
			})
			.catch(err => {
				console.log(err);
				toast.error('An error occured while trying to remove this resource.');
			});
		this.closeModal();
	};

	render() {
		return (
			<Modal
				open={this.props.open}
				onClose={() => this.closeModal()}
				size="tiny"
			>
				<Modal.Header>
					<Lang>dashboard.albums.modals.delete.title</Lang>
				</Modal.Header>
				<Modal.Content>
					<Lang>dashboard.albums.modals.delete.message</Lang>
				</Modal.Content>
				<Modal.Actions>
					<Button
						labelPosition="left"
						icon
						negative
						onClick={() => this.closeModal()}
					>
						<Icon name="remove" />
						<Lang>actions.no</Lang>
					</Button>
					<Button
						labelPosition="right"
						icon
						positive
						onClick={() => this.deleteResource()}
					>
						<Icon name="checkmark" />
						<Lang>actions.yes</Lang>
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		open: state.modals.deleteResources,
		options: state.modals.deleteResourcesOptions
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () =>
			dispatch(actions.modals.toggleModal('deleteResources', false)),
		deleteResource: uuid => dispatch(actions.resources.deleteResource(uuid))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeleteAlbumModal);
