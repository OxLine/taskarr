import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteTask } from '../../actions/task';

class Task extends Component {
  handleDelete() {
    var { team_id } = this.props.data;
    this.props.deleteTask(team_id);
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
    var { name } = this.props.data;

    return (
      <div className="task col s12">
        <div className="card">
          { this.render_task() }
        </div>
      </div>
    );
  }
}


export default connect(null, { deleteTask })(Task);
