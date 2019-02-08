import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as pub from '../../../services/publicService';
import * as file from '../../../services/fileTypesService';
import * as http from '../../../services/httpService';

class Slider extends Component {
	state = {
		index: 0,
		resources: []
	};

	componentDidMount() {
		pub.getAlbum(this.props.match.params.uuid).then(res => {
			console.log(res);
			this.setState({
				resources: res.data.album.resources,
				index: res.data.album.resources.length - 1
			});
		});
	}

	renderFile = () => {
		if (this.state.resources.length > 0) {
			if (
				file.types.image.includes(this.state.resources[this.state.index].type)
			) {
				console.log('img');
				return (
					<img
						src={this.getSrc(this.state.resources[this.state.index].location)}
						className="file"
					/>
				);
			}

			if (
				file.types.video.includes(
					this.state.resources[this.state.index].type
				) ||
				file.types.video.audio(this.state.resources[this.state.index].type)
			) {
				console.log('vid');
				return (
					<ReactPlayer
						url={this.getSrc(this.state.resources[this.state.index].location)}
						playing
						controls
						loop={
							this.state.resources[this.state.index].loop == 1 ? true : false
						}
						muted={
							this.state.resources[this.state.index].muted == 1 ? true : false
						}
						className="file"
					/>
				);
			}
		}
	};

	getSrc = uuid => {
		return http.imageUrl + '/' + uuid;
	};

	render() {
		return <div className="frame_file">{this.renderFile()}</div>;
	}
}

export default Slider;
