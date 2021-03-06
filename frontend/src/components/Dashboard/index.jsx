import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Container, SidebarPusher } from 'semantic-ui-react';
import SideMenu from './SideMenu';
import './style.scss';
import FirstPage from './Components/FirstPage';
import Albums from './Components/Albums';
import Navbar from './Navbar';
import actions from '../../redux/actions';
import { connect } from 'react-redux';
import UserSettings from './Components/UserSettings';
import Resources from './Components/Resources';

class Dashboard extends Component {
	render() {
		return (
			<React.Fragment>
				<SideMenu />
				<Navbar />
				{/* <SidebarPusher style={{ width: 'calc(100% - 252px)' }}> */}
				{/* <Grid className="dashboard-grid" columns="equal"> */}
				<Switch>
					<Route path="/dashboard" exact component={FirstPage} />
					<Route path="/dashboard/user" exact component={UserSettings} />
					<Route path="/dashboard/albums" exact component={Albums} />
					<Route path="/dashboard/albums/:uuid" exact component={Resources} />
					<Redirect to="/404" />
				</Switch>
				{/* </Grid> */}

				{/* </Container> */}
				{/* </SidebarPusher> */}
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setTitle: title => dispatch(actions.dashboard.setTitle(title))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(Dashboard);
