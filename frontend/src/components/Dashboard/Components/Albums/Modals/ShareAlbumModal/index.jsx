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

class ShareAlbumModal extends Component {
	panes = [
		{
			menuItem: lang.get('dashboard.albums.modals.share.frame.title'),
			render: () => <ShareFrame data={this.props.options} />
		},
		{
			menuItem: lang.get('dashboard.albums.modals.share.button.title'),
			render: () => <ShareButton data={this.props.options} />
		}
	];

	closeModal = () => {
		this.props.closeModal();
	};

	render() {
		return (
			<Modal
				open={this.props.open}
				onClose={() => this.closeModal()}
				size="massive"
			>
				<Modal.Header>
					<Lang>dashboard.albums.modals.share.title</Lang>
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
		open: state.modals.shareAlbums,
		options: state.modals.shareAlbumsOptions
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => dispatch(actions.modals.toggleModal('shareAlbums', false))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShareAlbumModal);
