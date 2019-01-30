import React, { Component } from 'react';
import { Menu, Container, Dropdown, Flag } from 'semantic-ui-react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../hoc/Logo';
import actions from '../../redux/actions';
import Lang from '../hoc/Lang';
import LanguageDropdown from '../hoc/LanguageDropdown';

class Navbar extends Component {
  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <Menu
        size="large"
        borderless
        inverted
        fixed="top"
        stackable
        color="orange"
      >
        <Container textAlign="center">
          <Menu.Item header>
            <Logo size={20} />
          </Menu.Item>
          <Menu.Item as={NavLink} exact to="/">
            <Lang>home.buttons.home</Lang>
          </Menu.Item>
          {this.props.user.auth ? (
            <Menu.Item as={NavLink} exact to="/dashboard">
              <Lang>home.buttons.dashboard</Lang>
            </Menu.Item>
          ) : (
            ''
          )}
          <Menu.Menu position="right">
            <LanguageDropdown />

            <Dropdown
              text={
                this.props.user.auth ? (
                  this.props.user.name
                ) : (
                  <Lang>home.account.account</Lang>
                )
              }
              item
            >
              <Dropdown.Menu>
                {this.props.user.auth ? (
                  <Dropdown.Item onClick={() => this.logout()}>
                    <Lang>home.account.logout</Lang>
                  </Dropdown.Item>
                ) : (
                  <React.Fragment>
                    <Dropdown.Item as={Link} to="/login">
                      <Lang>home.account.login</Lang>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register">
                      <Lang>home.account.register</Lang>
                    </Dropdown.Item>
                  </React.Fragment>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.auth.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
