import React, { Component } from 'react';
import File from './File';
import { Switch, Route, Redirect } from 'react-router-dom';
import './style.scss';

class Frame extends Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/frame/file/:uuid" exact component={File} />
					<Redirect to="/404" />
				</Switch>
			</React.Fragment>
		);
	}
}

export default Frame;