import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../../../redux/actions';
import { Image, Modal, Header, Button, Icon } from 'semantic-ui-react';
import Lang from '../../../../../hoc/Lang/index';
import * as albums from '../../../../../../services/albumsService';
import { toast } from 'react-toastify';
import * as notification from '../../../../../../services/notificationService';

class DeleteAlbumModal extends Component {
	closeModal = () => {
		this.props.closeModal();
	};

	deleteAlbum = () => {
		let uuid = this.props.options.uuid;

		albums
			.remove(uuid)
			.then(res => {
				this.props.deleteAlbum(uuid);
				notification.success('messages.album.delete');
			})
			.catch(err => {
				console.log(err);
				notification.error();
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
						onClick={() => this.deleteAlbum()}
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
		open: state.modals.deleteAlbums,
		options: state.modals.deleteAlbumsOptions
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () =>
			dispatch(actions.modals.toggleModal('deleteAlbums', false)),
		deleteAlbum: uuid => dispatch(actions.albums.deleteAlbum(uuid))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeleteAlbumModal);
