import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Employee from '../Employee';

class Employees extends Component {
<<<<<<< HEAD
  getUndestributedeEmployees (employees) {
    employees.filter(emp => !emp.team_id);
  }

=======
>>>>>>> ae221a1a47d938abc7d22073a71513b0dea3950f
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
