import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchEmployees } from '../../actions/employee';
import Employees from '../Employees';
import Navbar from '../Navbar';

class EmployeeDistribution extends Component {
  componentWillMount() {
    this.props.fetchEmployees(this.props.params.id);
  }

  render() {
    var id = this.props.params.id;

    return (
      <div className="container">
        <Navbar />
        <div className="container">
          <Link className="btn" to="/add_tasks">Add new tasks</Link>
          <Link className="btn" to="/manage_tasks">Manage tasks</Link>
        </div>
        <Employees company_id={this.props.params.id}/>
      </div>
    );
  }
}

export default connect(null, { fetchEmployees })(EmployeeDistribution);
