import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import Lang from '../../../../../hoc/Lang/index';
import actions from '../../../../../../redux/actions';
import { connect } from 'react-redux';

class AddAlbumButton extends Component {
	openAddModal = () => {
		this.props.toggleAddModal();
	};

	render() {
		return (
			<Card onClick={() => this.openAddModal()} className="add_album_button">
				{/* <Card.Content className="add_album_button_container">
					<Card.Header> */}
				<Icon name="plus" />
				{/* </Card.Header>
				</Card.Content> */}
			</Card>
		);
	}
}

const mapDispatchToProps = dispath => {
	return {
		toggleAddModal: () => dispath(actions.modals.toggleModal('addAlbums', true))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(AddAlbumButton);
