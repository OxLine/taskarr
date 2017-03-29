import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteEmployee } from '../../actions/employee';

class Employee extends Component {
  handleDelete = () => {
    var { id } = this.props.data;
    this.props.deleteEmployee(id)
  };

  render_employee = () => {
    var { username, is_confirmd } = this.props.data;
    if (is_confirmd) {
      return (
        <div className="card-content">{ username } <i onClick={this.handleDelete} className="fa fa-trash delete-emp right red-text darken-4" aria-hidden="true"></i></div>
      )
    } else {
      return (
        <div className="card-content grey-text">{ username } <i onClick={this.handleDelete} className="fa delete-emp fa-trash right red-text darken-4" aria-hidden="true"></i></div>
      )
    }
  }

  render() {
    var { username } = this.props.data;

    return (
      <div className="employee col s12">
        <div className="card">
          { this.render_employee() }
        </div>
      </div>
    )
  }
}


export default connect(null, { deleteEmployee })(Employee);
