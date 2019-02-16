import React, { Component } from 'react';
import Navbar from '../Navbar';
import Logo from '../hoc/Logo';
import './style.scss';
import Lang from '../hoc/Lang';
import {
	Segment,
	Divider,
	Button,
	Icon,
	Card,
	Container,
	Image
} from 'semantic-ui-react';
import * as http from '../../services/httpService';

class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar />
				<div className="img__header">
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
				<Segment vertical className="cli">
					<h1>
						<Lang>home.cli</Lang>
					</h1>
					<h4>
						<b>
							<Lang>home.clidesc</Lang>
						</b>
					</h4>
					<Button
						color="blue"
						icon
						labelPosition="left"
						href={http.cliUrl + '/win'}
					>
						<Icon name="download" />
						Windows
					</Button>
					<Button
						color="green"
						icon
						labelPosition="left"
						href={http.cliUrl + '/unix'}
					>
						<Icon name="download" />
						Linux
					</Button>
				</Segment>
				<div className="pros">
					<h1 style={{ marginBottom: '2em' }}>
						<Lang>home.pros.title</Lang>
					</h1>
					<Container>
						<Card.Group stackable centered itemsPerRow={3}>
							<Card color="orange">
								<Card.Content style={{ textAlign: 'center' }}>
									<h1>
										<Icon name="users" />
									</h1>
									<h4>
										<Lang>home.pros.1</Lang>
									</h4>
								</Card.Content>
							</Card>
							<Card color="orange">
								<Card.Content style={{ textAlign: 'center' }}>
									<h1>
										<Icon name="lightning" />
									</h1>
									<h4>
										<Lang>home.pros.2</Lang>
									</h4>
								</Card.Content>
							</Card>
							<Card color="orange">
								<Card.Content style={{ textAlign: 'center' }}>
									<h1>
										<Icon name="cogs" />
									</h1>
									<h4>
										<Lang>home.pros.3</Lang>
									</h4>
								</Card.Content>
							</Card>
							<Card color="orange">
								<Card.Content style={{ textAlign: 'center' }}>
									<h1>
										<Icon name="flag" />
									</h1>
									<h4>
										<Lang>home.pros.4</Lang>
									</h4>
								</Card.Content>
							</Card>
							<Card color="orange">
								<Card.Content style={{ textAlign: 'center' }}>
									<h1>
										<Icon name="phone" />
									</h1>
									<h4>
										<Lang>home.pros.5</Lang>
									</h4>
								</Card.Content>
							</Card>
							<Card color="orange">
								<Card.Content style={{ textAlign: 'center' }}>
									<h1>
										<Icon name="folder" />
									</h1>
									<h4>
										<Lang>home.pros.6</Lang>
									</h4>
								</Card.Content>
							</Card>
						</Card.Group>
					</Container>
				</div>
				<div className="about">
					<h1>
						<Lang>home.we.title</Lang>
					</h1>
					<Container>
						<Card.Group stackable centered itemsPerRow={2}>
							<Card>
								<Image src="/img/face.gif" />
								<Card.Content>
									<h1>Hutu Tudor</h1>
									<h3>Frontend</h3>
								</Card.Content>
								<Card.Content>
									<Button
										color="blue"
										icon
										href="https://www.facebook.com/tudor.hutu.14"
									>
										<Icon name="facebook f" />
									</Button>
									<Button
										color="black"
										icon
										href="https://github.com/hututudor"
									>
										<Icon name="github" />
									</Button>
								</Card.Content>
							</Card>
							<Card>
								<Image src="/img/face.gif" />
								<Card.Content>
									<h1>Baroncea Andrei</h1>
									<h3>Backend</h3>
								</Card.Content>
								<Card.Content>
									<Button
										color="blue"
										icon
										href="https://www.facebook.com/baronceaa"
									>
										<Icon name="facebook f" />
									</Button>
									<Button
										color="black"
										icon
										href="https://github.com/TinaSnipesU"
									>
										<Icon name="github" />
									</Button>
								</Card.Content>
							</Card>
						</Card.Group>
					</Container>
				</div>
				<div className="footer">
					<Lang>home.footer.copyright</Lang> &copy; {new Date().getFullYear()}{' '}
					NuLL
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
