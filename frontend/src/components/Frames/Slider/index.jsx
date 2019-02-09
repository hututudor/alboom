import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as pub from '../../../services/publicService';
import * as file from '../../../services/fileTypesService';
import * as http from '../../../services/httpService';
import { Icon, Loader } from 'semantic-ui-react';
import ReactSwipeEvents from 'react-swipe-events';
import Logo from '../../hoc/Logo';

class Slider extends Component {
	state = {
		index: 0,
		resources: [],
		album: null,
		showing: false
	};

	componentDidMount() {
		pub.getAlbum(this.props.match.params.uuid).then(res => {
			console.log(res);
			this.setState({
				resources: res.data.album.resources,
				album: res.data.album,
				index: res.data.album.resources.length - 1
			});
		});
	}

	setShowing = () => {
		this.setState({ showing: false });
	};

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
						onLoad={() => this.setShowing()}
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
						// light
						controls
						onStart={() => this.setShowing()}
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
			this.setState({ index: this.state.resources.length - 1, showing: true });
		} else {
			this.setState({ index: this.state.index - 1, showing: true });
		}
	};

	goLeft = () => {
		if (this.state.index >= this.state.resources.length - 1) {
			this.setState({ index: 0, showing: true });
		} else {
			this.setState({ index: this.state.index + 1, showing: true });
		}
	};

	render() {
		return (
			<ReactSwipeEvents
				onSwipedLeft={() => this.goLeft()}
				onSwipedRight={() => this.goRight()}
			>
				<div className="frame_file">
					{this.state.album && this.state.album.controls == 1 ? (
						<React.Fragment>
							<Icon
								name="angle left"
								size={this.props.match.params.type === 's' ? 'big' : 'huge'}
								fitted
								onClick={() => this.goLeft()}
							/>
							<Icon
								name="angle right"
								size={this.props.match.params.type === 's' ? 'big' : 'huge'}
								fitted
								onClick={() => this.goRight()}
							/>
							<i
								className={
									this.props.match.params.type === 's' ? 'small-ic' : 'big-ic'
								}
							>
								{this.state.resources.length - this.state.index} /{' '}
								{this.state.resources.length}
							</i>
						</React.Fragment>
					) : (
						''
					)}
					{this.renderFile()}
					<Loader
						size="large"
						className="loader"
						color="white"
						active={this.state.showing}
					>
						<Logo />
					</Loader>
				</div>
			</ReactSwipeEvents>
		);
	}
}

export default Slider;
