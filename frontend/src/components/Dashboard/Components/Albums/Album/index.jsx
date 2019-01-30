import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import actions from '../../../../../redux/actions';
import { connect } from 'react-redux';

class Album extends Component {
  openDeleteModal = () => {
    this.props.openDeleteModal();
  };

  render() {
    console.log(this.props.data);
    return (
      <Card
        color={this.props.data.color}
        // as={Link}
        to={'dashboard/albums/' + this.props.data.uuid}
      >
        <Card.Content>
          <Card.Header>{this.props.data.name}</Card.Header>
          <Card.Meta>{moment(this.props.data.created_at).calendar()}</Card.Meta>
          <Card.Content className="centered-buttons">
            <Button
              color="blue"
              as={Link}
              to={'dashboard/albums/' + this.props.data.uuid}
            >
              <Icon name="eye" />
            </Button>{' '}
            <Button color="yellow">
              <Icon name="cog" />
            </Button>{' '}
            <Button color="red" onClick={() => this.openDeleteModal()}>
              <Icon name="remove" />
            </Button>
          </Card.Content>
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openDeleteModal: () =>
      dispatch(
        actions.modals.toggleModal('deleteAlbums', true, {
          uuid: ownProps.data.uuid
        })
      )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Album);
