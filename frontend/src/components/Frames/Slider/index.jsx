import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as pub from '../../../services/publicService';
import * as file from '../../../services/fileTypesService';
import * as http from '../../../services/httpService';
import { Icon, Loader } from 'semantic-ui-react';
import ReactSwipeEvents from 'react-swipe-events';
import Logo from '../../hoc/Logo';
import { CSSTransition } from 'react-transition-group';
import './transitions.scss';

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

		document.addEventListener('keydown', e => this.handleKeyDown(e));
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', e => this.handleKeyDown(e));
	}

	setShowing = () => {
		this.setState({ showing: false });
	};

	autoplay = index => {
		if (this.state.album.autoplay === 1 && this.state.index === index) {
			this.goRight();
		}
	};

	renderFile = () => {
		let index = this.state.index;
		if (this.state.resources.length > 0) {
			if (file.types.image.includes(this.state.resources[index].type)) {
				console.log('img');

				return (
					<CSSTransition
						in={true}
						appear={true}
						timeout={500}
						key={this.state.index}
						classNames={this.state.resources[index].transition}
					>
						<img
							src={this.getSrc(this.state.resources[index].location)}
							className={
								this.state.album &&
								this.state.album.controls === 1 &&
								this.state.album.autoplay === 0
									? 'vid'
									: 'file'
							}
							onLoad={() => {
								this.setShowing();
								setTimeout(() => this.autoplay(index), 5000);
							}}
						/>
					</CSSTransition>
				);
			}

			if (
				file.types.video.includes(this.state.resources[index].type) ||
				file.types.audio.includes(this.state.resources[index].type)
			) {
				console.log('vid');
				return (
					<CSSTransition
						in={true}
						appear={true}
						timeout={500}
						key={this.state.index}
						classNames={this.state.resources[index].transition}
					>
						<ReactPlayer
							url={this.getSrc(this.state.resources[index].location)}
							playing
							controls
							onStart={() => this.setShowing()}
							onEnded={() => this.autoplay(index)}
							loop={this.state.resources[index].loop == 1 ? true : false}
							muted={this.state.resources[index].mute == 1 ? true : false}
							className="vid"
						/>
					</CSSTransition>
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

	handleKeyDown = e => {
		if (e.key === 'ArrowLeft') {
			this.goLeft();
		} else if (e.key === 'ArrowRight') {
			this.goRight();
		}
	};

	render() {
		return (
			<ReactSwipeEvents
				onSwipedLeft={() => this.goLeft()}
				onSwipedRight={() => this.goRight()}
			>
				<div className="frame_file">
					{this.state.album &&
					this.state.album.controls === 1 &&
					this.state.album.autoplay === 0 ? (
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
						className="loader-c"
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
