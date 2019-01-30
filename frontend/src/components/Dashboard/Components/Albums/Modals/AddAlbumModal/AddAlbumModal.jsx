import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Image, Header } from 'semantic-ui-react';
import actions from '../../../../../../redux/actions';
import Lang from '../../../../../hoc/Lang/index';

class AddAlbumModal extends Component {
  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={() => this.closeModal()}>
        <Modal.Header>
          <Lang>dashboard.albums.modals.add.title</Lang>
        </Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
          />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.modals.addAlbums
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(actions.modals.toggleModal('addAlbums', false))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAlbumModal);
