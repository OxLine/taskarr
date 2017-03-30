// @flow
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';

import Navbar from '../Navbar';
import Companies from '../Companies';
import SelectTasks from '../SelectTasks';

class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Home">
        <div>
          <div className="container">
            <Navbar />
            <Companies />
            <SelectTasks />
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default(Home);
