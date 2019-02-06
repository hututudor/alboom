import React, { Component } from 'react';
import { Menu, Divider, Sidebar } from 'semantic-ui-react';
import Logo from '../../hoc/Logo/index';
import SideItem from './SideItem';
import Lang from '../../hoc/Lang/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class SideMenu extends Component {
	render() {
		return (
			<Sidebar visible={true} color={this.props.theme}>
				<Menu
					size="large"
					inverted
					fixed="left"
					vertical
					borderless
					color={this.props.theme}
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
					<SideItem
						onClick={() => this.props.history.goBack()}
						to=""
						icon="arrow left"
					>
						<Lang>dashboard.buttons.back</Lang>
					</SideItem>

					<SideItem to="/" icon="home">
						<Lang>dashboard.buttons.home</Lang>
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

const mapStateToProps = state => {
	return {
		theme: state.auth.user.preferences.theme
	};
};

export default withRouter(connect(mapStateToProps)(SideMenu));
