import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Employee from '../Employee';

class Employees extends Component {
  render() {
    var { employees } = this.props.data;

    return (
      <div className="container">
        <div className="row">
          { employees.map(employee =>
            <Employee key={employee.id} data={{...employee}}/>
          )}
        </div>
      </div>
    );
  }
}

export default connect()(Employees);
