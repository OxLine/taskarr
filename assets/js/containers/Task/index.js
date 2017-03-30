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
        <div className="card-content"><i onClick={this.handleDelete} className="fa fa-trash delete-emp right red-text darken-4" aria-hidden="true"></i>{ name.split('\n').map((line) => <p key={Math.random()}>{line}</p> )} </div>
      );
    } else {
      return (
        <div className="card-content grey-text"><i onClick={this.handleDelete} className="fa delete-emp fa-trash right red-text darken-4" aria-hidden="true"></i>{ name.split('\n').map((line) => <p key={Math.random()}>{line}</p> )} </div>
      );
    }
  }

  render() {
    var { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className="task card">
        { !isDragging && this.render_task() }
      </div>
    );
  }
}


export default connect(null, { deleteTask })(
  DragSource(TASK, taskSource, collectSource)(Task));
