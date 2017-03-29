import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../Task';


class Tasks extends Component {
  getUndestributedeTasks (tasks) {
    tasks.filter(emp => !emp.team_id);
  }

  render() {
    var { tasks } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <div className="task-list">
              { tasks.map((task) =>
                  <Task key={task.id} data={task} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    tasks: state.tasks,
  }), null)(Tasks);
