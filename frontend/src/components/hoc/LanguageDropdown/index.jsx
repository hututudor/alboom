import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import { Flag, Dropdown } from 'semantic-ui-react';
import Lang from '../Lang/index';

class LanguageDropdown extends Component {
  changeLanguage = name => {
    this.props.updateLanguage(name);
  };

  render() {
    return (
      <Dropdown
        text={
          <React.Fragment>
            <Flag
              name={this.props.lang.name === 'en' ? 'us' : this.props.lang.name}
            />{' '}
            {this.props.lang.name === 'en' ? <Lang>languages.en</Lang> : null}
            {this.props.lang.name === 'ro' ? <Lang>languages.ro</Lang> : null}
            {this.props.lang.name === 'es' ? <Lang>languages.es</Lang> : null}
          </React.Fragment>
        }
        item
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => this.changeLanguage('en')}>
            <Flag name="us" />
            <Lang>languages.en</Lang>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => this.changeLanguage('ro')}>
            <Flag name="ro" />
            <Lang>languages.ro</Lang>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => this.changeLanguage('es')}>
            <Flag name="es" />
            <Lang>languages.es</Lang>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
const mapStateToProps = state => {
  return {
    lang: state.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLanguage: name => dispatch(actions.lang.updateLanguage(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageDropdown);
