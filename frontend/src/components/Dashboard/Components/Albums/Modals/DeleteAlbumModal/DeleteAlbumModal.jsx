import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../../../redux/actions';
import { Image, Modal, Header, Button } from 'semantic-ui-react';
import Lang from '../../../../../hoc/Lang/index';
import * as albums from '../../../../../../services/albumsService';
import { toast } from 'react-toastify';

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
			})
			.catch(err => {
				console.log(err);
				toast.error('An error occured while trying to remove this album.');
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
						icon="close"
						negative
						content="No"
						onClick={() => this.closeModal()}
					/>
					<Button
						labelPosition="right"
						icon="checkmark"
						content="Yes"
						positive
						onClick={() => this.deleteAlbum()}
					/>
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
