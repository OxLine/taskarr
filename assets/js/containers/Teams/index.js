import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Team from '../Team';
import ScrollArea from 'react-scrollbar';

class Teams extends Component {
  getTeamEmployees = (employees, id) => employees.filter(emp => emp.team_id === id)

  render() {
    var { teams, employees } = this.props;

    return (
      <div className="team-list">
        <ScrollArea
          speed={0.8}
          className="area"
          contentClassName="content"
          horizontal={false}
          >
            { teams.map((team) =>
              <Team employees={ this.getTeamEmployees(employees, team.id) } key={team.id} data={team} />
            )}
        </ScrollArea>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    teams: state.teams,
  }), null)(Teams);
