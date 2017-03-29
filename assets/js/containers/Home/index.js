// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions/task';
import Navbar from '../Navbar';
import Tasks from '../Tasks';

import Companies from '../Companies';
import DocumentTitle from 'react-document-title';


class Home extends Component {

  componentWillMount() {
    this.props.fetchTasks();
  }

  render() {
    var tasks = this.props.tasks;

    return (
      <DocumentTitle title="Home">
        <div>
          <div className="container">
            <Navbar />
            <Companies />
            <div className="row">
              <div className="col s6">
                <Tasks tasks={ tasks }/>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect (
  (state) => ({
    tasks: state.tasks,
  }), { fetchTasks })(Home);
