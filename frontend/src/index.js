import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as auth from './services/authService';
import * as token from './services/tokenService';
import App from './App';
import actions from './redux/actions';
import 'semantic-ui-css/semantic.min.css';
import languages from './languages';

window.store = store;

const rend = () => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
		document.getElementById('root')
	);
};

// check if the user has any language preferences and then if it is a supported language
const lang = localStorage.getItem('lang');
if (lang && languages.supported.includes(lang)) {
	store.dispatch(actions.lang.updateLanguage(lang));
}

// chaeck if the token exists and then check if it is valid
if (token.exists()) {
	auth
		.getUser()
		.then(res => {
			store.dispatch(actions.auth.updateUser({ auth: true, ...res.data.user }));
			rend();
		})
		.catch(err => rend());
} else {
	rend();
}
