import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions';
import Basic from './Basic';
import { Tab } from 'semantic-ui-react';
import Lang from '../../../../components/hoc/Lang';
import * as lang from '../../../../services/langService';
import Password from './Password';

const panes = [
	{
		menuItem: lang.get('dashboard.user.tabs.basic'), //() => <Lang>dashboard.user.tabs.basic</Lang>,
		render: () => <Basic />
	},
	{
		menuItem: lang.get('dashboard.user.tabs.password'), //() => <Lang>dashboard.user.tabs.basic</Lang>,
		render: () => <Password />
	}
];

class UserSettings extends Component {
	componentDidMount() {
		this.props.setTitle('dashboard.titles.user');
	}

	render() {
		return (
			<div className="contain dash nopadding">
				<Tab menu={{ secondary: true, pointing: true }} panes={panes} />
			</div>
		);
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
)(UserSettings);
