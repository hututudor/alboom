import React, { Component } from 'react';
import { Card, Icon, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import actions from '../../../../../redux/actions';
import { connect } from 'react-redux';
import Lang from '../../../../hoc/Lang';

class Album extends Component {
	openDeleteModal = event => {
		event.preventDefault();
		this.props.openDeleteModal();
	};

	openEditModal = event => {
		event.preventDefault();
		this.props.openEditModal();
	};

	openShareModal = event => {
		event.preventDefault();
		this.props.openShareModal();
	};

	render() {
		return (
			<Card
				color={this.props.color}
				as={Link}
				to={'/dashboard/albums/' + this.props.data.uuid}
				style={{ overflowX: 'hidden' }}
			>
				<Card.Content>
					<Card.Header>{this.props.data.name}</Card.Header>
					<Card.Meta>{moment(this.props.data.created_at).calendar()}</Card.Meta>
					<Card.Content className="centered-buttons">
						<Popup
							trigger={
								<Button
									color="green"
									onClick={event => this.openShareModal(event)}
								>
									<Icon name="share square" />
								</Button>
							}
						>
							<Popup.Header>
								<Lang>dashboard.popups.share</Lang>
							</Popup.Header>
						</Popup>{' '}
						<Popup
							trigger={
								<Button
									color="yellow"
									onClick={event => this.openEditModal(event)}
								>
									<Icon name="cog" />
								</Button>
							}
						>
							<Popup.Header>
								<Lang>dashboard.popups.edit</Lang>
							</Popup.Header>
						</Popup>{' '}
						<Popup
							trigger={
								<Button
									color="red"
									onClick={event => this.openDeleteModal(event)}
								>
									<Icon name="remove" />
								</Button>
							}
						>
							<Popup.Header>
								<Lang>dashboard.popups.delete</Lang>
							</Popup.Header>
						</Popup>
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
		},
		openShareModal: () => {
			dispatch(
				actions.modals.toggleModal('shareAlbums', true, { ...ownProps.data })
			);
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Album);
