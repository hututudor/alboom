import React, { Component } from 'react';
import { Menu, Divider, Sidebar } from 'semantic-ui-react';
import Logo from '../../hoc/Logo/index';
import SideItem from './SideItem';
import Lang from '../../hoc/Lang/index';

class SideMenu extends Component {
	render() {
		return (
			<Sidebar visible={true} color="orange">
				<Menu
					size="large"
					inverted
					fixed="left"
					vertical
					borderless
					color="orange"
				>
					<Menu.Item
						style={{
							textAlign: 'left',
							marginBottom: '1.2em',
							marginTop: '1em'
						}}
					>
						<span>
							<Logo size={30} />
						</span>
					</Menu.Item>
					<SideItem to="/" icon="arrow left">
						<Lang>dashboard.buttons.back</Lang>
					</SideItem>

					<SideItem to="/dashboard" icon="dashboard">
						<Lang>dashboard.buttons.dashboard</Lang>
					</SideItem>

					<SideItem to="/dashboard/albums" icon="folder">
						<Lang>dashboard.buttons.albums</Lang>
					</SideItem>

					<SideItem to="/dashboard/user" icon="cogs">
						<Lang>dashboard.buttons.user</Lang>
					</SideItem>

					<SideItem to="/logout" icon="sign out">
						<Lang>dashboard.buttons.logout</Lang>
					</SideItem>
				</Menu>
			</Sidebar>
		);
	}
}

export default SideMenu;
