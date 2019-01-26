import React, { Component } from 'react';
import Navbar from '../Navbar';
import { Placeholder } from 'semantic-ui-react';
import Logo from '../hoc/Logo';
import './style.scss';
import Lang from '../hoc/Lang';

class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar />
				<div className="imgheader">
					<div>
						<Logo size={50} />
						<span>
							<Lang>home.title</Lang>
						</span>
						<span>
							<Lang>home.subtitle</Lang>
						</span>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
