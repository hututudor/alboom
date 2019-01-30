import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

class Album extends Component {
  render() {
    console.log(this.props.data);
    return (
      <Card
        color={this.props.data.color}
        as={Link}
        to={'dashboard/albums/' + this.props.data.uuid}
      >
        <Card.Content>
          <Card.Header>{this.props.data.name}</Card.Header>
          <Card.Meta>{moment(this.props.data.created_at).calendar()}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default Album;
