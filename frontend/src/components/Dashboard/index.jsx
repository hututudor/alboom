import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import SideMenu from './SideMenu';
import './style.scss';

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Grid className="dashboard-grid">
          <SideMenu />
        </Grid>
        {/* <Switch>
         <Route />
       </Switch> */}
      </React.Fragment>
    );
  }
}

export default Dashboard;
