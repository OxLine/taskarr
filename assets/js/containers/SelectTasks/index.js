import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions/task';
import { getCompanies } from '../../actions/company';
import { fetchTeams } from '../../actions/team';
import Tasks from '../Tasks';

class SelectTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: '',
      selectedTeam: ''
    };
    this.handleSelectCompanyChange = this.handleSelectCompanyChange.bind(this);
    this.handleSelectTeamChange = this.handleSelectTeamChange.bind(this);
    this.setTasks = this.setTasks.bind(this);
  }

  componentWillMount() {
    this.props.fetchTasks();
    this.props.getCompanies();
    this.props.fetchTeams();
  }

  handleSelectCompanyChange(event) {
    var selectedCompany = event.target.value;
    this.setState()((prevState, props) => ({
      tasks: this.setTasks(selectedCompany, prevState.selectedTeam, prevState),
      selectedCompany: selectedCompany})
    );
  }

  handleSelectTeamChange(event) {
    var selectedTeam = event.target.value;
    this.setState()((prevState, props) => ({
      tasks: this.setTasks(prevState.selectedCompany, selectedTeam, prevState),
      selectedTeam: selectedTeam})
    );
  }

  setTasks(selectedCompany, selectedTeam, prevState) {
    var tasks = prevState.tasks;
    return tasks.filter(task =>
      (!selectedCompany || task.company_id==selectedCompany) &&
      (!selectedTeam || task.team_id==selectedTeam)
    );
  }

  render() {
    var companies = this.props.company.companies || [];
    var teams = this.props.teams || [];
    return (
      <div className="row">
        {companies.length?
          <select value={this.state.selectedCompany} onChange={this.handleSelectCompanyChange}>
            {companies.map(company =>
              <option key={company.id} value={company.id}>{company.name}</option>
            )}
          </select> : null
        }
        {teams.length?
          <select  value={this.state.selectedTeam} onChange={this.handleSelectTeamChange}>
            {teams.map(team =>
              <option key={team.id} value={team.id}>{team.name}</option>
            )}
          </select> : null
        }
        <div className="col s6">
          <Tasks tasks={ this.state.tasks }/>
        </div>
      </div>
    );
  }
}

export default connect (
  (state) => ({
    tasks: state.tasks,
    company: state.company,
    teams: state.teams
  }), { fetchTasks, getCompanies, fetchTeams })(SelectTasks);
