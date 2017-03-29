import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchEmployees } from '../../actions/employee';
import { fetchTeams } from '../../actions/team';
import Employees from '../Employees';
import Navbar from '../Navbar';
import Teams from '../Teams';

import AddEmployee from '../AddEmployee';
import AddTeam from '../AddTeam';

class EmployeeDistribution extends Component {
  componentWillMount() {
    this.props.fetchTeams(this.props.params.id);
    this.props.fetchEmployees(this.props.params.id);
  }

  getUndestributedeEmployees = (employees) => {
    return employees.filter(emp => !emp.team_id);
  }

  getDistributedEmployees = (employees) => {
    return employees.filter(emp => emp.team_id);
  }

  render() {
    var id = this.props.params.id;
    var employees = this.props.employees;
    var undestributedEmployees = this.getUndestributedeEmployees(employees);
    var distrubetedEmployees = this.getDistributedEmployees(employees);

    return (
      <div className="container">
        <Navbar />
        <div className="container">
          <Link className="btn" to="/new_task">New task</Link>
          <Link className="btn" to="/manage_task">Manage task</Link>
        </div>
        <div className="row">
          <div className="col s6">
            <AddEmployee company_id={id}/>
            <Employees employees={ undestributedEmployees } company_id={this.props.params.id}/>
          </div>
          <div className="col s6">
            <AddTeam company_id={id}/>
            <Teams employees={ distrubetedEmployees } company_id={this.props.params.id}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
(state) => ({
  employees: state.employees,
  }), { fetchEmployees, fetchTeams })(EmployeeDistribution);
