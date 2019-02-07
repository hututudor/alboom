import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class File extends Component {
	render() {
		return (
			<div className="frame_file">
				<ReactPlayer
					url="http://localhost:8000/image/190381549567528.mp3"
					controls
					playing
					className="file"
				/>
				{/* <img
					src="http://localhost:8000/image/980191549566487.jpg"
					className="file"
				/> */}
			</div>
		);
	}
}

export default File;
