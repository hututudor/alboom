import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import actions from '../../../../../../redux/actions';
import Lang from '../../../../../hoc/Lang/index';
import AddResourceModalForm from './AddResourceModalForm';
import { withRouter } from 'react-router-dom';
import * as notification from '../../../../../../services/notificationService';
import * as resource from '../../../../../../services/resourcesService';

class AddResourceModal extends Component {
  closeModal = () => {
    this.props.closeModal();
    this.props.setLoading(true);
    resource
      .getAll(this.props.uuid)
      .then(res => {
        console.log(res);
        this.props.getResources(res.data.resources);
        this.props.setLoading(false);
      })
      .catch(err => {
        console.log(err);
        notification.errorN();
      });
  };

  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.closeModal()}
        size="small"
      >
        <Modal.Header>
          <Lang>dashboard.resources.modals.add.title</Lang>
        </Modal.Header>
        <AddResourceModalForm uuid={this.props.uuid} />
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.modals.addResources
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () =>
      dispatch(actions.modals.toggleModal('addResources', false)),
    getResources: resources =>
      dispatch(actions.resources.getResources(resources))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddResourceModal);
