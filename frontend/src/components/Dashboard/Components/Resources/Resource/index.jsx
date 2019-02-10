import React, { Component } from 'react';
import { Card, Button, Icon, Image, Popup } from 'semantic-ui-react';
import moment from 'moment';
import * as file from '../../../../../services/fileTypesService';
import { imageUrl } from '../../../../../services/httpService';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../../../redux/actions';
import Lang from '../../../../hoc/Lang';

class Resource extends Component {
	getSrc() {
		let type = this.props.data.type;

		if (file.types.image.includes(type)) {
			return (
				<Image
					style={{ maxHeight: '200.8', width: 'auto' }}
					src={imageUrl + '/' + this.props.data.location}
				/>
			);
		}

		if (file.types.audio.includes(type)) {
			return (
				<Image src="https://via.placeholder.com/1920x1080.png/000000/FFFFFF?text=Music+File" />
			);
		}

		if (file.types.video.includes(type)) {
			return (
				<Image src="https://via.placeholder.com/1920x1080.png/000000/FFFFFF?text=Video+File" />
			);
		}
	}

	openDeleteModal = event => {
		event.preventDefault();
		this.props.openDeleteModal(this.props.data.uuid);
	};

	openEditModal = event => {
		event.preventDefault();
		this.props.openEditModal();
	};

	downloadFile = event => {
		event.preventDefault();
		window.location.href = imageUrl + '/download/' + this.props.data.location;
	};

	shareFile = event => {
		event.preventDefault();
		this.props.openShareModal();
	};

	render() {
		return (
			<Card
				href={imageUrl + '/' + this.props.data.location}
				style={{ overflowX: 'hidden' }}
				target="_blank"
			>
				{this.getSrc()}
				<Card.Content>
					<Card.Header>
						<div title={`${this.props.data.name}.${this.props.data.type}`}>
							{this.props.data.name}.{this.props.data.type}
						</div>
					</Card.Header>
					<Card.Meta>{moment(this.props.data.created_at).calendar()}</Card.Meta>
				</Card.Content>
				<Card.Content className="centered-buttons" extra>
					<Popup
						trigger={
							<Button color="green" onClick={event => this.shareFile(event)}>
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
							<Button color="blue" onClick={event => this.downloadFile(event)}>
								<Icon name="download" />
							</Button>
						}
					>
						<Popup.Header>
							<Lang>dashboard.popups.download</Lang>
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
			</Card>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		openDeleteModal: uuid =>
			dispatch(
				actions.modals.toggleModal('deleteResources', true, {
					uuid: ownProps.data.uuid
				})
			),
		openEditModal: () => {
			dispatch(
				actions.modals.toggleModal('editResources', true, { ...ownProps.data })
			);
		},
		openShareModal: () => {
			dispatch(
				actions.modals.toggleModal('shareResource', true, { ...ownProps.data })
			);
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Resource);
