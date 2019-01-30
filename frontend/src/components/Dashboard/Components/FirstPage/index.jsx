import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions';

class FirstPage extends Component {
  componentDidMount() {
    this.props.setTitle('dashboard.titles.dashboard');
  }

  render() {
    return <div>First</div>;
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    setTitle: title => dispatch(actions.dashboard.setTitle(title))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FirstPage);
