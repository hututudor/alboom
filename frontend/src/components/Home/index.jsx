import React, { Component } from 'react';
import Navbar from '../Navbar';
import Logo from '../hoc/Logo';
import './style.scss';
import Lang from '../hoc/Lang';
import { Segment } from 'semantic-ui-react';

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
        <Segment vertical>sdd</Segment>
      </React.Fragment>
    );
  }
}

export default Home;
