import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Tasks from '../Tasks';
import { TASK } from '../../constants/itemTypes';
import { DropTarget } from 'react-dnd';
import { changeTeam } from '../../actions/task';

const tasksTarget = {
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

class UndistributedTasks extends Component {
  getTeamTasks = (tasks, id) => tasks.filter(task => task.team_id === id)

  render() {
    var { tasks, connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div className="container">
        <div className="card unde-task">
          <Tasks isOver={isOver} tasks={ tasks }/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    teams: state.teams,
  }), { changeTeam })(
  DropTarget(TASK, tasksTarget, collectTarget)(UndistributedTasks));
