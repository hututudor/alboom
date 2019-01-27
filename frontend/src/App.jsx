import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import NotFound from './components/NotFound';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<ToastContainer />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/404" component={NotFound} />
					<Redirect to="/404" />
				</Switch>
			</React.Fragment>
		);
	}
}

export default App;
