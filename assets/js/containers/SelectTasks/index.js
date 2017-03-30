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
      selectedTeam: '',
      tasks: this.props.tasks
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
    this.setState({selectedCompany: event.target.value});
    this.setTasks();
  }

  handleSelectTeamChange(event) {
    this.setState({selectedTeam: event.target.value});
    this.setTasks();
  }

  setTasks() {
    var tasks = this.state.tasks;
    tasks = tasks.filter(task =>
      (!this.state.selectedCompany || task.company_id==this.state.selectedCompany) &&
      (!this.state.selectedTeam || task.team_id==this.state.selectedTeam)
    );
    this.setState({tasks: tasks});
  }

  render() {
    var companies = this.props.company.companies || [];
    var teams = this.props.teams || [];
    return (
      <div className="row">
        {companies.length &&
          <select value={this.state.selectedCompany} onChange={this.handleSelectCompanyChange}>
            {companies.map(company =>
              <option key={company.id} value={company.id}>{company.name}</option>
            )}
          </select>
        }
        {teams.length &&
          <select  value={this.state.selectedTeam} onChange={this.handleSelectTeamChange}>
            {teams.map(team =>
              <option key={team.id} value={team.id}>{team.name}</option>
            )}
          </select>
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
