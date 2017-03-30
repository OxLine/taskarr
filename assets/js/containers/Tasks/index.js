import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../Task';


class Tasks extends Component {
  render() {
    var tasks = this.props.tasks || [];
    const uncompletedTasks = tasks.filter(task => !task.is_completed);
    const completedTasks = tasks.filter(task => task.is_completed);

    return (
      <div className="container">
        <div className="row">
            <div className="task-list">
              { completedTasks.map((task) =>
                  <Task key={task.id} data={task} />
              )}
              { uncompletedTasks.map((task) =>
                  <Task key={task.id} data={task} />
              )}
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
