import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Employee from '../Employee';

import AddEmployee from '../AddEmployee';

class Employees extends Component {
  getUndestributedeEmployees (employees) {
    employees.filter(emp => !emp.team_id);
  }

  render() {
    var { employees, company_id } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <AddEmployee company_id={this.props.company_id}/>
            <div className="team-list">
              { employees.map((employee) =>
                  <Employee key={employee.id} data={employee} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    employees: state.employees,
}), null)(Employees);
