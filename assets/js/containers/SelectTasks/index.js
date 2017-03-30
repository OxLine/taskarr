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
  }

  componentWillMount() {
    this.props.fetchTasks();
    this.props.getCompanies();
    this.props.fetchTeams();
  }

  handleSelectCompanyChange(event) {
    this.setState({selectedCompany: event.target.value});
  }

  handleSelectTeamChange(event) {
    this.setState({selectedTeam: event.target.value});
  }

  render() {
    var companies = this.props.company || [];
    var tasks = this.props.tasks || [];
    var teams = this.props.teams || [];

    return (
      <div className="row">
        {companies.length?
          <select value={this.state.selectedCompany} onChange={this.handleSelectCompanyChange}>
            {companies.map(company =>
              <option value={company.id}>{company.name}</option>
            )}
          </select> : null
        }
        {tasks.length?
          <select value={this.state.selectedTeam} onChange={this.handleSelectTeamChange}>
            {tasks.map(task =>
              <option value={task.id}>{task.name}</option>
            )}
          </select> :null
        }
        <div className="col s6">
          <Tasks tasks={ tasks }/>
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
