import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../../../redux/actions';
import { Image, Modal, Header, Button, Icon, Tab } from 'semantic-ui-react';
import Lang from '../../../../../hoc/Lang/index';
import * as resources from '../../../../../../services/resourcesService';
import * as notification from '../../../../../../services/notificationService';
import * as lang from '../../../../../../services/langService';
import ShareFrame from './ShareFrame';
import ShareButton from './ShareButton';

class ShareResourceModal extends Component {
	panes = [
		{
			menuItem: lang.get('dashboard.resources.modals.share.frame.title'),
			render: () => <ShareFrame data={this.props.options} />
		},
		{
			menuItem: lang.get('dashboard.resources.modals.share.button.title'),
			render: () => <ShareButton data={this.props.options} />
		}
	];

	closeModal = () => {
		this.props.closeModal();
	};

	deleteResource = () => {
		let uuid = this.props.options.uuid;

		resources
			.remove(uuid)
			.then(res => {
				this.props.deleteResource(uuid);
				notification.success('messages.resource.delete');
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
				size="massive"
			>
				<Modal.Header>
					<Lang>dashboard.resources.modals.share.title</Lang>
				</Modal.Header>
				<Modal.Content>
					<Tab panes={this.panes} menu={{ secondary: true, pointing: true }} />
				</Modal.Content>
				<Modal.Actions>
					<Button
						labelPosition="right"
						icon
						positive
						onClick={() => this.closeModal()}
					>
						<Icon name="remove" />
						<Lang>actions.close</Lang>
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		open: state.modals.shareResource,
		options: state.modals.shareResourceOptions
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () =>
			dispatch(actions.modals.toggleModal('shareResource', false))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShareResourceModal);
