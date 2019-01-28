import React, { Component } from 'react';
import { Menu, Divider } from 'semantic-ui-react';
import Logo from '../../hoc/Logo/index';
import SideItem from './SideItem';
import Lang from '../../hoc/Lang/index';

class SideMenu extends Component {
  render() {
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        borderless
        color="orange"
      >
        <Menu.Item
          style={{ textAlign: 'left', marginBottom: '1.2em', marginTop: '1em' }}
        >
          <span>
            <Logo size={35} />
          </span>
        </Menu.Item>
        <SideItem to="/" icon="arrow left">
          <Lang>dashboard.buttons.back</Lang>
        </SideItem>

        <SideItem to="/logout" icon="sign out">
          <Lang>dashboard.buttons.logout</Lang>
        </SideItem>
      </Menu>
    );
  }
}

export default SideMenu;
