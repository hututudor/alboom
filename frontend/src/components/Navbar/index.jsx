import React, { Component } from 'react';
import { Menu, Container, Dropdown, Flag } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../hoc/Logo';
import actions from '../../redux/actions';
import Lang from '../hoc/Lang';

class Navbar extends Component {
	changeLanguage = name => {
		this.props.updateLanguage(name);
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
					<Menu.Menu position="right">
						<Dropdown
							text={
								<React.Fragment>
									<Flag
										name={
											this.props.lang.name === 'en'
												? 'us'
												: this.props.lang.name
										}
									/>{' '}
									{this.props.lang.name === 'en' ? (
										<Lang>languages.en</Lang>
									) : null}
									{this.props.lang.name === 'ro' ? (
										<Lang>languages.ro</Lang>
									) : null}
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
							</Dropdown.Menu>
						</Dropdown>

						<Dropdown
							text={this.props.user.auth ? this.props.user.name : 'Account'}
							item
						>
							<Dropdown.Menu>
								{this.props.user.auth ? (
									<Dropdown.Item text="Logout" />
								) : (
									<Dropdown.Item text="User" />
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
		user: state.auth.user,
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
)(Navbar);
