import React, { Component } from 'react';
import Album from './Album';
import { Grid, Card, Container } from 'semantic-ui-react';
import * as albums from '../../../../services/albumsService';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions';
import AddAlbumButton from './Album/AddAlbumButton';
import AddAlbumModal from './Modals/AddAlbumModal';
import DeleteAlbumModal from './Modals/DeleteAlbumModal';
import EditAlbumModal from './Modals/EditAlbumModal';

class Albums extends Component {
	componentDidMount() {
		this.props.setTitle('dashboard.titles.albums');

		albums
			.getAll()
			.then(res => {
				console.log(res);
				this.props.getAlbums(res.data.albums);
			})
			.catch(err => {});
	}

	render() {
		console.log('rerendered', this.props.albums);
		return (
			<div className="contain dash">
				<Container>
					<Card.Group centered stackable itemsPerRow={3}>
						<AddAlbumButton />
						<EditAlbumModal />
						<DeleteAlbumModal />
						<AddAlbumModal />
						{this.props.albums.map((album, index) => (
							<Album key={index} data={album} color={album.color} />
						))}
					</Card.Group>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		albums: state.albums.albums
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getAlbums: albums => dispatch(actions.albums.getAlbums(albums)),
		setTitle: title => dispatch(actions.dashboard.setTitle(title))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Albums);
