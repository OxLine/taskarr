import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { deleteTask } from '../../actions/task';
import { TASK } from '../../constants/itemTypes';

const taskSource = {
  beginDrag(props) {
    return props.data;
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Task extends Component {
  constructor (props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.render_task = this.render_task.bind(this);
  }

  handleDelete() {
    var { id } = this.props.data;
    this.props.deleteTask(id);
  }

  render_task() {
    var { name, is_completed } = this.props.data;
    if (is_completed) {
      return (
        <div className="card-content">{ name } <i onClick={this.handleDelete} className="fa fa-trash delete-emp right red-text darken-4" aria-hidden="true"></i></div>
      );
    } else {
      return (
        <div className="card-content grey-text">{ name } <i onClick={this.handleDelete} className="fa delete-emp fa-trash right red-text darken-4" aria-hidden="true"></i></div>
      );
    }
  }

  render() {
    var { connectDragSource } = this.props;
    return connectDragSource(
      <div className="task col s12">
        <div className="card">
          { this.render_task() }
        </div>
      </div>
    );
  }
}


export default connect(null, { deleteTask })(
  DragSource(TASK, taskSource, collectSource)(Task));
