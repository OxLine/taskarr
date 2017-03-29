import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteTeam } from '../../actions/team';
import Employees from '../Employees';

class Team extends Component {
  handleDelete = () => {
    var { id } = this.props.data;
    this.props.deleteTeam(id)
  };

  render() {
    var { name } = this.props.data;
    console.log(this.props);

    return (
      <div className="card">
        <div className="card-content">{ name } <i onClick={this.handleDelete} className="fa fa-trash delete-team right red-text darken-4" aria-hidden="true"></i></div>
        <div className="card-content">
          <Employees employees={this.props.employees} />
        </div>
      </div>
    )
  }
}


export default connect(null, { deleteTeam })(Team);
