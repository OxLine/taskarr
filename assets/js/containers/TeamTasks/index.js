import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteTeam } from '../../actions/team';
import { changeTeam } from '../../actions/task';
import { DropTarget } from 'react-dnd';
import { TASK } from '../../constants/itemTypes';
import Tasks from '../Tasks';
import TeamTeamlid from '../TeamTeamlid';
import TeamEmployees from '../TeamEmployees';

const tasksTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    targetProps.changeTeam(sourceProps.id, targetProps.data.id);
    console.log(sourceProps.id, targetProps.data.id);
    // targetProps.setTeamleader(targetProps.team_id, sourceProps.id);
    // targetProps.changeTeam(sourceProps.id, null);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}


class Team extends Component {
  getTeamLid(tasks, teamlid_id) {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === teamlid_id) {
        return tasks[i];
      }
    }
  }

  render() {
    var { teamlid_id, name, id } = this.props.data;
    var { tasks, connectDropTarget, isOver } = this.props;
    // <Employees isOver={isOver} tasks={tasks} />
    // <TeamTeamlid team_id={id} employee={this.getTeamLid(tasks, teamlid_id)} />
    // <TeamEmployees tasks={tasks} teamlid_id={teamlid_id} id={id} />

    return connectDropTarget(
      <div className="container">
        <div className="card team-tasks">
          <div className="card-content">{ name } </div>
          <Tasks isOver={isOver} team={this.props.data} tasks={tasks} />
        </div>
      </div>
    )
  }
}


export default connect(null, { changeTeam, deleteTeam })(
  DropTarget(TASK, tasksTarget, collectTarget)(Team));
