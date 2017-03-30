import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../Task';
import ScrollArea from 'react-scrollbar';


class Tasks extends Component {
  renderTasks(tasks) {
    const uncompletedTasks = tasks.filter(task => !task.is_completed);
    const completedTasks = tasks.filter(task => task.is_completed);

    if (tasks.length > 0) {
      return (
        <div className="task-list">
          <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
            >
            { completedTasks.map((task) =>
                <Task key={task.id} data={task} />
            )}
            { uncompletedTasks.map((task) =>
                <Task key={task.id} data={task} />
            )}
          </ScrollArea>
        </div>
      );
    }
  }
  render() {
    var { isOver } = this.props;
    var areaClass = isOver ? 'area' : 'area area-btm';
    var tasks = this.props.tasks || [];

    return (
      <div className="container">
        <div className="row">
          { this.renderTasks(tasks) }
          { isOver && <div className="can-drop-task"></div> }
          </div>
      </div>
    );
  }
}

export default connect(null)(Tasks);
