import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// getEmployees
import { getEmployees } from '../../actions/employee';
import Employees from '../Employees';

class EmployeeDistribution extends Component {
  componentWillMount() {
    this.props.getEmployees();
  }

  render() {
    var { employees }  = this.props.data;
    const undistributedEmployees = [];
    if (employees.undistributed) {
      undistributedEmployees = employees.undistributed;
      delete employees.undistributed;
    }
    return (
      <div className="container">
        <Link to="/new_task">New task</Link>
        <Link to="/manage_task">Manage task</Link>
        <h3>Undistributed Employees</h3>
        <Employees data={{"employees": undistributedEmployees}} />
        <h3>Teams</h3>
        <div className="team-list">
          { Object.keys(employees).map((key, index) =>
              <Employees key={employees[key].id} data={{"employees": employees[key]}} />
          }
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    employee: state.getEmployees
  }), { getEmployees })(EmployeeDistribution);
