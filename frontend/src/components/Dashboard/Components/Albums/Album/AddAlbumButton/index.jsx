import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Lang from '../../../../../hoc/Lang/index';
import './style.scss';

class AddAlbumButton extends Component {
  openAddModal = () => {
    console.log('a');
  };

  render() {
    return (
      <Card onClick={() => this.openAddModal()} className="add_album_button">
        <Card.Content className="add_album_button_container">
          <Card.Header>
            <Lang>dashboard.albums.add</Lang>
          </Card.Header>
        </Card.Content>
      </Card>
    );
  }
}

export default AddAlbumButton;
