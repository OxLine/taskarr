// @flow
import React, { Component } from 'react';
import { Router, IndexRoute, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { authenticate, unauthenticate } from '../../actions/session';
import Home from '../Home';
import EmployeeDistribution from '../EmployeeDistribution';
import TaskDistribution from '../TaskDistribution';
import AddTasks from '../AddTasks';
import NotFound from '../../components/NotFound';
import Login from '../Login';
import Signup from '../Signup';
import MatchAuthenticated from '../MatchAuthenticated';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

const redirectAuthenticated = (isAuthenticated, willAuthenticate) => {
  return (dispatch) => {
    if (isAuthenticated || willAuthenticate) {
      dispatch(push('/'));
    }
  }
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: Props

  redirectAuthenticated = () => this.props.redirectAuthenticated(this.props.isAuthenticated, this.props.willAuthenticate);

  render() {
    return (
      <Router key={Math.random()} history={this.props.routerHistory }>
        <Route onEnter={this.redirectAuthenticated}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Route>

        <Route path="/" component={MatchAuthenticated}>
          <IndexRoute component={Home} />
          <Route path="/distribution/:id" component={EmployeeDistribution} />
          <Route path="/add_tasks/:company_id" component={AddTasks} />
          <Route path="/manage_tasks/:company_id" component={TaskDistribution} />
        </Route>

        <Route path="*" component={ NotFound } />
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(
connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  }), { authenticate, unauthenticate, redirectAuthenticated })(App)
);
