import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { EMPLOYEE } from '../../constants/itemTypes';
import Employees from '../Employees';
import { changeTeam } from '../../actions/employee';

const teamTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    targetProps.changeTeam(sourceProps.id, targetProps.id);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class TeamEmployees extends Component {
  getEmployeesWithoutTeamLead(employees, teamlid_id) {
    return employees.filter(emp => emp.id !== teamlid_id);
  }

  render() {
    var { teamlid_id, employees, connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div>
        <Employees isOver={isOver} employees={this.getEmployeesWithoutTeamLead(employees, teamlid_id)} />
      </div>
    );
  }
}

export default connect(null, { changeTeam })(
  DropTarget(EMPLOYEE, teamTarget, collectTarget)(TeamEmployees));
