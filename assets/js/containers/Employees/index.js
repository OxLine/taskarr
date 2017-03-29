import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Employee from '../Employee';

class Employees extends Component {
  getUndestributedeEmployees (employees) {
    return employees.filter(emp => !emp.team_id);
  }

  render() {
    var { employees, company_id } = this.props;

    return (
      <div>
        <div className="team-list container">
          { employees.map((employee) =>
              <Employee key={employee.id} data={employee} />
          )}
        </div>
      </div>
    );
  }
}

export default connect()(Employees);
