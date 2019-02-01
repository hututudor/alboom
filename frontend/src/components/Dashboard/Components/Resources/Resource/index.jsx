import React, { Component } from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import moment from 'moment';
import * as file from '../../../../../services/fileTypesService';
import { imageUrl } from '../../../../../services/httpService';
import { Link } from 'react-router-dom';

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

export default Resource;
