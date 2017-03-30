import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteTeam } from '../../actions/team';
import { changeTeam } from '../../actions/employee';
import { DropTarget } from 'react-dnd';
import { EMPLOYEE, TEAM } from '../../constants/itemTypes';
import Employees from '../Employees';
import TeamTeamlid from '../TeamTeamlid';
import TeamEmployees from '../TeamEmployees';

class Team extends Component {
  handleDelete = () => {
    var { id } = this.props.data;
    this.props.deleteTeam(id);
  };

  getTeamLid(employees, teamlid_id) {
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].id === teamlid_id) {
        return employees[i];
      }
    }
  }

  render() {
    var { teamlid_id, name, id } = this.props.data;
    var { employees, connectDropTarget, isOver } = this.props;
    // <Employees isOver={isOver} employees={employees} />

    return (
      <div className="container">
        <div className="card">
          <div className="card-content">{ name } <i onClick={this.handleDelete} className="fa fa-trash delete-team right red-text darken-4" aria-hidden="true"></i></div>
          <TeamTeamlid team_id={id} employee={this.getTeamLid(employees, teamlid_id)} />
          <TeamEmployees employees={employees} teamlid_id={teamlid_id} id={id} />
        </div>
      </div>
    )
  }
}


export default connect(null, { changeTeam, deleteTeam })(Team);
