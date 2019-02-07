import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions';
import { Segment, Container, Button, Grid, Divider } from 'semantic-ui-react';
import Lang from '../../../hoc/Lang';
import { Link } from 'react-router-dom';

class FirstPage extends Component {
	componentDidMount() {
		this.props.setTitle('dashboard.titles.dashboard');
	}

	render() {
		return (
			<div className="contain dash center first">
				<Container>
					<h2>
						<Lang>dashboard.first.title</Lang>
					</h2>
					<h4>
						<Lang>dashboard.first.hello</Lang> {this.props.user.name},{' '}
						<Lang>dashboard.first.message</Lang>
					</h4>
					<div>
						<Button color="green" as={Link} to="/dashboard/albums">
							<Lang>dashboard.first.buttons.albums</Lang>
						</Button>
						<Button color="purple" as={Link} to="/dashboard/user">
							<Lang>dashboard.first.buttons.settings</Lang>
						</Button>
					</div>
				</Container>
			</div>
		);
	}
}

export const mapStateToProps = state => {
	return {
		user: state.auth.user
	};
};

export const mapDispatchToProps = dispatch => {
	return {
		setTitle: title => dispatch(actions.dashboard.setTitle(title))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FirstPage);
