import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Employee from '../Employee';

class Employees extends Component {
  getUndistributedeEmployees (employees) {
    return employees.filter(emp => !emp.team_id);
  }

  renderEmployees (employees, isOver) {
    if (employees.length > 0) {
      return (
        <div>
          { employees.map((employee) =>
                <Employee key={employee.id} data={employee} />
            )}
        </div>
      );
    } else if (!isOver) {
      return <span className="grey-text">No employees</span>;
    }
  }

  render() {
    var { employees, isOver } = this.props;

    return (
      <div>
        <div className="team-list container">
          { this.renderEmployees(employees, isOver) }
          { isOver && <div className="can-drop"></div> }
        </div>
      </div>
    );
  }
}

export default connect()(Employees);
