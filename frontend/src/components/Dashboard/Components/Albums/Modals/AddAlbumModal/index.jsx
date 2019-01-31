import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Image, Header } from 'semantic-ui-react';
import actions from '../../../../../../redux/actions';
import Lang from '../../../../../hoc/Lang/index';
import AddAlbumModalForm from './AddAlbumModalForm';

class AddAlbumModal extends Component {
	closeModal = () => {
		this.props.closeModal();
	};

	render() {
		return (
			<Modal
				open={this.props.open}
				onClose={() => this.closeModal()}
				size="small"
			>
				<Modal.Header>
					<Lang>dashboard.albums.modals.add.title</Lang>
				</Modal.Header>
				<AddAlbumModalForm />
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		open: state.modals.addAlbums
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => dispatch(actions.modals.toggleModal('addAlbums', false))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddAlbumModal);
