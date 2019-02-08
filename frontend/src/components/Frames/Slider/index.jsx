import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as pub from '../../../services/publicService';
import * as file from '../../../services/fileTypesService';
import * as http from '../../../services/httpService';
import { Icon } from 'semantic-ui-react';

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
				file.types.audio.includes(this.state.resources[this.state.index].type)
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
							this.state.resources[this.state.index].mute == 1 ? true : false
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

	goRight = () => {
		if (this.state.index <= 0) {
			this.setState({ index: this.state.resources.length - 1 });
		} else {
			this.setState({ index: this.state.index - 1 });
		}
	};

	goLeft = () => {
		if (this.state.index >= this.state.resources.length - 1) {
			this.setState({ index: 0 });
		} else {
			this.setState({ index: this.state.index + 1 });
		}
	};

	render() {
		return (
			<div className="frame_file">
				<Icon
					name="angle left"
					size="huge"
					fitted
					onClick={() => this.goLeft()}
				/>
				<Icon
					name="angle right"
					size="huge"
					fitted
					onClick={() => this.goRight()}
				/>
				{this.renderFile()}
			</div>
		);
	}
}

export default Slider;
