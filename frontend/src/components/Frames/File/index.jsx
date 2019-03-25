import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import * as pub from '../../../services/publicService';
import * as file from '../../../services/fileTypesService';
import * as http from '../../../services/httpService';

class File extends Component {
  state = {
    resource: null
  };

  componentDidMount() {
    pub.getResource(this.props.match.params.uuid).then(res => {
      console.log(res);
      this.setState({ resource: res.data.resource });
    });
  }

  getSrc = uuid => {
    return http.imageUrl + '/' + uuid;
  };

  renderFile = () => {
    if (this.state.resource) {
      if (file.types.image.includes(this.state.resource.type)) {
        return (
          <img
            src={this.getSrc(this.state.resource.location)}
            className="vid"
          />
        );
      }

      if (
        file.types.video.includes(this.state.resource.type) ||
        file.types.audio.includes(this.state.resource.type)
      ) {
        return (
          <ReactPlayer
            url={this.getSrc(this.state.resource.location)}
            playing
            controls
            loop={this.state.resource.loop == 1 ? true : false}
            muted={this.state.resource.muted == 1 ? true : false}
            className="vid"
          />
        );
      }
    }
  };

  render() {
    return (
      <div className="frame_file">
        {this.renderFile()}
        {/* <ReactPlayer
					url="http://localhost:8000/image/190381549567528.mp3"
					controls
					playing
					className="file"
				/> */}
        {/* <img
					src="http://localhost:8000/image/980191549566487.jpg"
					className="file"
				/> */}
      </div>
    );
  }
}

export default File;
