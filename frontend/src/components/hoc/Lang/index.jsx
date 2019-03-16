import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import languages from '../../../languages';

class Lang extends Component {
  componentDidMount() {
    // console.log(languages[this.props.lang].default);
  }

  render() {
    return (
      <React.Fragment>
        {_.get(
          languages[this.props.lang].default,
          this.props.children + (this.props.extra ? '.' + this.props.extra : '')
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return {
    lang: state.lang.name
  };
};

export default connect(mapStatetoProps)(Lang);
