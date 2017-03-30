import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { EMPLOYEE } from '../../constants/itemTypes';
import Employee from '../Employee';
import { setTeamleader } from '../../actions/team';

const teamlidTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    targetProps.setTeamleader(targetProps.team_id, sourceProps.id);
    // targetProps.changeTeam(sourceProps.id, null);
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

  renderEmployee(employee, isOver) {
    if (employee) {
      return <Employee data={employee} />
    } else if (!isOver) {
      return <span className="grey-text">no teamlead</span>
    }
  }

  render() {
    var { employee, connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div className="container">
        { this.renderEmployee(employee, isOver) } 
        { isOver && <div className="can-drop"></div> } <hr/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    teams: state.teams,
  }), { setTeamleader })(
  DropTarget(EMPLOYEE, teamlidTarget, collectTarget)(UndestributedEmployees));
