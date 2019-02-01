import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Image, Header } from 'semantic-ui-react';
import actions from '../../../../../../redux/actions';
import Lang from '../../../../../hoc/Lang/index';
import AddResourceModalForm from './AddResourceModalForm';

class AddResourceModal extends Component {
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
					<Lang>dashboard.resources.modals.add.title</Lang>
				</Modal.Header>
				<AddResourceModalForm />
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		open: state.modals.addResources
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () =>
			dispatch(actions.modals.toggleModal('addResources', false))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddResourceModal);
