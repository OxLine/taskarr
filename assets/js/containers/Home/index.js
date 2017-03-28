// @flow
import React, { Component } from 'react';
import Navbar from '../Navbar';

import CreateCompany from '../CreateCompany';
import DocumentTitle from 'react-document-title';


class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Home">
        <div>
          <div className="container">
            <Navbar />
            <CreateCompany />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default Home;
