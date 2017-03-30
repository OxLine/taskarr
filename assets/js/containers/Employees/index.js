import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Employee from '../Employee';
import ScrollArea from 'react-scrollbar';

class Employees extends Component {
  getUndistributedeEmployees (employees) {
    return employees.filter(emp => !emp.team_id);
  }

  renderEmployees (employees, isOver) {
    if (employees.length > 0) {
      return (
        <div>
          { employees.map(employee =>
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
    var areaClass = isOver ? 'area' : 'area area-btm';

    return (
      <div>
        <div className="team-list container">
          <ScrollArea
            speed={0.8}
            className={areaClass}
            contentClassName="content"
            horizontal={false}
            >
            { this.renderEmployees(employees, isOver) }
          </ScrollArea>
          { isOver && <div className="can-drop"></div> }
        </div>
      </div>
    );
  }
}

export default connect()(Employees);
