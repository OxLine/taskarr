import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteEmployee } from '../../actions/employee';
import { DragSource } from 'react-dnd';
import { EMPLOYEE, TEAM } from '../../constants/itemTypes';

const employeeSource = {
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

class Employee extends Component {
  constructor (props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.render_employee = this.render_employee.bind(this);
  }

  handleDelete() {
    var { id } = this.props.data;
    this.props.deleteEmployee(id);
  }

  render_employee() {
    var { username, is_confirmed } = this.props.data;
    if (is_confirmed) {
      return (
        <div className="card-content">{ username } <i onClick={this.handleDelete} className="fa fa-trash delete-emp right red-text darken-4" aria-hidden="true"></i></div>
      );
    } else {
      return (
        <div className="card-content grey-text">{ username } <i onClick={this.handleDelete} className="fa delete-emp fa-trash right red-text darken-4" aria-hidden="true"></i></div>
      );
    }
  }

  render() {
    var { username } = this.props.data;
    var { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div className="employee">
        <div className="card">
          { !isDragging && this.render_employee() }
        </div>
      </div>
    );
  }
}


export default connect(null, { deleteEmployee })(
  DragSource(EMPLOYEE, employeeSource, collectSource)(Employee));
