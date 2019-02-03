import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Image, Header } from 'semantic-ui-react';
import actions from '../../../../../../redux/actions';
import Lang from '../../../../../hoc/Lang/index';
import EditResourceModalForm from './EditResourceModalForm';

class EditResourceModal extends Component {
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
					<Lang>dashboard.albums.modals.edit.title</Lang>
				</Modal.Header>
				<EditResourceModalForm />
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		open: state.modals.editResources
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () =>
			dispatch(actions.modals.toggleModal('editResources', false))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditResourceModal);
