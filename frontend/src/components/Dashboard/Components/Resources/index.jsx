import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions';
import * as album from '../../../../services/albumsService';
import * as notification from '../../../../services/notificationService';
import * as resource from '../../../../services/resourcesService';
import { Card, Container } from 'semantic-ui-react';
import Resource from './Resource';
import AddResourceButton from './Resource/AddResourceButton';
import AddResourceModal from './Modals/AddResourceModal';
import DeleteResourceModal from './Modals/DeleteResourceModal';
import EditResourceModal from './Modals/EditResourceModal';

class Resources extends Component {
	componentDidMount() {
		this.props.setTitle('dashboard.titles.album', '');

		album
			.get(this.props.match.params.uuid)
			.then(res => {
				console.log(res.data.album.name);
				this.props.setTitle('dashboard.titles.album', res.data.album.name);
			})
			.catch(err => {
				console.log(err);
				notification.error();
			});

		resource
			.getAll(this.props.match.params.uuid)
			.then(res => {
				console.log(res);
				this.props.getResources(res.data.resources);
			})
			.catch(err => {
				console.log(err);
			});
	}

	componentWillUnmount() {
		this.props.removeResources();
	}

	render() {
		return (
			<div className="contain dash">
				<Container>
					<Card.Group centered stackable itemsPerRow={3}>
						<AddResourceButton />
						<AddResourceModal uuid={this.props.match.params.uuid} />
						<DeleteResourceModal />
						<EditResourceModal />
						{/* <EditAlbumModal />
						<DeleteAlbumModal /> */}
						{/* <AddAlbumModal /> */}
						{this.props.resources.map((resource, index) => (
							<Resource key={index} data={resource} />
						))}
					</Card.Group>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		resources: state.resources.resources
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setTitle: (title, param) =>
			dispatch(actions.dashboard.setTitle(title, param)),
		getResources: resources =>
			dispatch(actions.resources.getResources(resources)),
		removeResources: () => dispatch(actions.resources.removeResources())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Resources);