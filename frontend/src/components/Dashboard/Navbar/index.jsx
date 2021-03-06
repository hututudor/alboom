import React, { Component } from 'react';
import { Menu, Flag, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Lang from '../../hoc/Lang/index';
import actions from '../../../redux/actions';
import LanguageDropdown from '../../hoc/LanguageDropdown';

class Navbar extends Component {
	render() {
		return (
			<Menu className="navbar" color={this.props.theme} inverted borderless>
				<Menu.Item>
					<Lang>{this.props.title}</Lang> {this.props.param}
				</Menu.Item>
				<Menu.Menu position="right">
					<LanguageDropdown />
				</Menu.Menu>
			</Menu>
		);
	}
}

const mapStateToProps = state => {
	return {
		title: state.dashboard.title,
		param: state.dashboard.param,
		lang: state.lang,
		theme: state.auth.user.preferences.theme
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
