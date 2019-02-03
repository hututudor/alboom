import React, { Component } from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';
import * as file from '../../../../../services/fileTypesService';
import { imageUrl } from '../../../../../services/httpService';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../../../../redux/actions';

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

		if (file.types.music.includes(type)) {
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

	render() {
		return (
			<Card href={imageUrl + '/' + this.props.data.location} target="_blank">
				{this.getSrc()}
				<Card.Content>
					<Card.Header>
						{this.props.data.name}.{this.props.data.type}
					</Card.Header>
					<Card.Meta>{moment(this.props.data.created_at).calendar()}</Card.Meta>
					<Card.Content className="centered-buttons">
						<Button color="blue" onClick={event => this.downloadFile(event)}>
							<Icon name="download" />
						</Button>{' '}
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
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Resource);