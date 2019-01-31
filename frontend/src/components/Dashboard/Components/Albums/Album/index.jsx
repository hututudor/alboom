import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import actions from '../../../../../redux/actions';
import { connect } from 'react-redux';

class Album extends Component {
	openDeleteModal = event => {
		event.preventDefault();
		this.props.openDeleteModal();
	};

	openEditModal = event => {
		event.preventDefault();
		this.props.openEditModal();
	};

	render() {
		console.log(this.props.data);
		return (
			<Card
				color={this.props.color}
				as={Link}
				to={'dashboard/albums/' + this.props.data.uuid}
			>
				<Card.Content>
					<Card.Header>{this.props.data.name}</Card.Header>
					<Card.Meta>{moment(this.props.data.created_at).calendar()}</Card.Meta>
					<Card.Content className="centered-buttons">
						<Button color="yellow" onClick={event => this.openEditModal(event)}>
							<Icon name="cog" />
						</Button>{' '}
						<Button color="red" onClick={event => this.openDeleteModal(event)}>
							<Icon name="remove" />
						</Button>
					</Card.Content>
				</Card.Content>
			</Card>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		openDeleteModal: () =>
			dispatch(
				actions.modals.toggleModal('deleteAlbums', true, {
					uuid: ownProps.data.uuid
				})
			),
		openEditModal: () => {
			dispatch(
				actions.modals.toggleModal('editAlbums', true, { ...ownProps.data })
			);
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Album);
