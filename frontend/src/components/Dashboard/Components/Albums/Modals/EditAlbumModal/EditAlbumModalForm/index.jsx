import React from 'react';
import FormClass from '../../../../../../hoc/FormClass';
import { Modal, Form, Icon, Message, Button } from 'semantic-ui-react';
import Lang from '../../../../../../hoc/Lang';
import * as lang from '../../../../../../../services/langService';
import _ from 'lodash';
import Joi from 'joi-browser';
import * as color from '../../../../../../../services/colorService';
import { connect } from 'react-redux';
import actions from '../../../../../../../redux/actions';
import * as album from '../../../../../../../services/albumsService';
import * as notification from '../../../../../../../services/notificationService';

class EditAlbumModalForm extends FormClass {
  state = {
    data: {
      name: '',
      color: '',
      public: false,
      controls: false,
      autoplay: false
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label('Name'),
    color: Joi.string()
      .required()
      .label('Color'),
    public: Joi.boolean()
      .required()
      .label('Public'),
    controls: Joi.boolean()
      .required()
      .label('Controls'),
    autoplay: Joi.boolean()
      .required()
      .label('Autoplay')
  };

  componentDidMount() {
    this.setState({
      data: {
        name: this.props.options.name,
        color: this.props.options.color,
        public: this.props.options.public === 1 ? true : false,
        controls: this.props.options.controls === 1 ? true : false,
        autoplay: this.props.options.autoplay === 1 ? true : false
      }
    });
  }

  closeModal = () => {
    this.props.closeModal();
  };

  doSubmit = () => {
    album
      .edit({
        name: this.state.data.name,
        color: this.state.data.color,
        public: this.state.data.public ? 1 : 0,
        controls: this.state.data.controls ? 1 : 0,
        autoplay: this.state.data.autoplay ? 1 : 0,
        uuid: this.props.options.uuid
      })
      .then(res => {
        this.props.editAlbum(this.props.options.uuid, res.data.album);
        notification.success('messages.album.edit');
        this.closeModal();
      })
      .catch(err => {
        console.log('fdf', err);
        notification.error();
      });
  };

  render() {
    return (
      <React.Fragment>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit} size="large">
              <Form.Input
                fluid
                name="name"
                placeholder={lang.get('dashboard.albums.modals.all.name')}
                label={lang.get('dashboard.albums.modals.all.name')}
                onChange={this.handleChange}
                value={this.state.data.name}
                className={this.getClass('name')}
                type="text"
              />

              <Form.Field>
                <Form.Field>
                  <Lang>dashboard.albums.modals.all.color</Lang>
                </Form.Field>
                <select
                  className="ui fluid dropdown"
                  name="color"
                  onChange={this.handleChange}
                  value={this.state.data.color}
                  className={this.getClass('color')}
                >
                  {color.colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </Form.Field>

              <div className="ui toggle checkbox">
                <input
                  type="checkbox"
                  name="public"
                  onChange={this.handleChange}
                  checked={this.state.data.public}
                  className={this.getClass('public')}
                />
                <label>
                  <Lang>dashboard.albums.modals.all.public</Lang>
                </label>
              </div>

              <br />

              <h3>
                <Lang>dashboard.albums.modals.all.settings</Lang>
              </h3>

              <div className="ui toggle checkbox">
                <input
                  type="checkbox"
                  name="controls"
                  onChange={this.handleChange}
                  checked={this.state.data.controls}
                  className={this.getClass('controls')}
                />
                <label>
                  <Lang>dashboard.albums.modals.all.controls</Lang>
                </label>
              </div>

              <br />
              <br />

              <div className="ui toggle checkbox">
                <input
                  type="checkbox"
                  name="autoplay"
                  onChange={this.handleChange}
                  checked={this.state.data.autoplay}
                  className={this.getClass('autoplay')}
                />
                <label>
                  <Lang>dashboard.albums.modals.all.autoplay</Lang>
                </label>
              </div>
            </Form>
            {_.isEmpty(this.state.errors) ? (
              ''
            ) : (
              <Message error>
                <h3>
                  <Lang>auth.errors</Lang>
                </h3>
                {this.displayErrors()}
              </Message>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            labelPosition="left"
            icon
            negative
            onClick={() => this.closeModal()}
          >
            <Icon name="remove" />
            <Lang>actions.cancel</Lang>
          </Button>
          <Button
            labelPosition="right"
            icon
            positive
            onClick={event => this.handleSubmit(event)}
          >
            <Icon name="save" />
            <Lang>actions.update</Lang>
          </Button>
        </Modal.Actions>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    options: state.modals.editAlbumsOptions
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeModal: () => dispatch(actions.modals.toggleModal('editAlbums', false)),
    editAlbum: (uuid, album) => dispatch(actions.albums.editAlbum(uuid, album))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAlbumModalForm);
