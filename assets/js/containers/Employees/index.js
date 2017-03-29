import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Employee from '../Employee';

class Employees extends Component {
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
