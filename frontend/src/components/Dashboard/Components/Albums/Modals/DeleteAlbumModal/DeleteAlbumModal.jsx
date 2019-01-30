import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../../../redux/actions';
import { Image, Modal, Header } from 'semantic-ui-react';
import Lang from '../../../../../hoc/Lang/index';

class DeleteAlbumModal extends Component {
  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <Modal open={this.props.open} onClose={() => this.closeModal()}>
        <Modal.Header>
          <Lang>dashboard.albums.modals.delete.title</Lang>
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
    open: state.modals.deleteAlbums,
    options: state.modals.deleteAlbumsOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () =>
      dispatch(actions.modals.toggleModal('deleteAlbums', false))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAlbumModal);
