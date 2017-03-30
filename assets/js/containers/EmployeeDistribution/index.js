import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchEmployees } from '../../actions/employee';
import { fetchTeams } from '../../actions/team';
import UndistributedEmployees from '../UndistributedEmployees';
import Navbar from '../Navbar';
import Teams from '../Teams';

import AddEmployee from '../AddEmployee';
import AddTeam from '../AddTeam';

class EmployeeDistribution extends Component {
  constructor (props) {
    super(props);
    this.getUndistributedeEmployees = this.getUndistributedeEmployees.bind(this);
    this.getDistributedEmployees = this.getDistributedEmployees.bind(this);
  }

  componentWillMount() {
    this.props.fetchTeams(this.props.params.id);
    this.props.fetchEmployees(this.props.params.id);
  }

  getUndistributedeEmployees(employees) {
    return employees.filter(emp => !emp.team_id);
  }

  getDistributedEmployees(employees) {
    return employees.filter(emp => emp.team_id);
  }

  render() {
    var id = this.props.params.id;
    var employees = this.props.employees;
    var undistributedEmployees = this.getUndistributedeEmployees(employees);
    var distributedEmployees = this.getDistributedEmployees(employees);

    return (
      <div className="container">
        <Navbar />
        <div className="container">
          <Link className="btn" to={ '/add_tasks/'+this.props.params.id }>Add tasks</Link>
          <Link className="btn" to={ '/manage_tasks/'+this.props.params.id }>Manage tasks</Link>
        </div>
        <div className="row">
          <div className="col s6">
            <AddEmployee company_id={id}/>
            <UndistributedEmployees employees={ undistributedEmployees }/>
          </div>
          <div className="col s6">
            <AddTeam company_id={id}/>
            <Teams employees={ distributedEmployees }/>
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
