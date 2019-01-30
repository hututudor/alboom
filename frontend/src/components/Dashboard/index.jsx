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

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <SideMenu />
        <Navbar />
        <SidebarPusher style={{ width: 'calc(100% - 252px)' }}>
          <div className="contain">
            {/* <Grid className="dashboard-grid" columns="equal"> */}
            <Switch>
              <Route path="/dashboard" exact component={FirstPage} />
              <Route path="/dashboard/albums" exact component={Albums} />
              <Redirect to="/404" />
            </Switch>
            {/* </Grid> */}
          </div>
          {/* </Container> */}
        </SidebarPusher>
      </React.Fragment>
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
)(Dashboard);
