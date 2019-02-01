import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';

class Resource extends Component {
	render() {
		return (
			<Card
			// as={Link}
			// to={'/dashboard/albums/' + this.props.data.uuid}
			>
				<Card.Content>
					<Card.Header image>
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
