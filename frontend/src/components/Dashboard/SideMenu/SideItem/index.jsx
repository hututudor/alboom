import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class SideItem extends Component {
	render() {
		console.log(this.props.icon);
		return (
			<Menu.Item
				as={NavLink}
				to={this.props.to}
				exact={this.props.exact}
				style={{ opacity: 0.7 }}
				className="sidemenuitem"
			>
				<span>
					<Icon name={this.props.icon} /> {this.props.children}
				</span>
			</Menu.Item>
		);
	}
}

SideItem.defaultProps = {
	exact: true
};

SideItem.propTypes = {
	children: PropTypes.object.isRequired,
	to: PropTypes.string.isRequired,
	exact: PropTypes.bool,
	icon: PropTypes.string.isRequired
};

export default SideItem;
