// @flow
import React, { Component } from 'react';
import Navbar from '../Navbar';

import Companies from '../Companies';
import DocumentTitle from 'react-document-title';


class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Home">
        <div>
          <div className="container">
            <Navbar />
            <Companies />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
