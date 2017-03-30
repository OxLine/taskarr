import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Employees from '../Employees';
import { EMPLOYEE } from '../../constants/itemTypes';
import { DropTarget } from 'react-dnd';
import { changeTeam } from '../../actions/employee';

const employeesTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    targetProps.changeTeam(sourceProps.id, null);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class UndestributedEmployees extends Component {
  getTeamEmployees = (employees, id) => employees.filter(emp => emp.team_id === id)

  render() {
    var { employees, connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div className="container">
        <div className="card unde-emp">
          <Employees isOver={isOver} employees={ employees }/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    teams: state.teams,
  }), { changeTeam })(
  DropTarget(EMPLOYEE, employeesTarget, collectTarget)(UndestributedEmployees));
