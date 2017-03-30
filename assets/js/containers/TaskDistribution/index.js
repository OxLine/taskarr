import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchTasksByCompany } from '../../actions/task';
import { fetchTeams } from '../../actions/team';
import Tasks from '../Tasks';
import Navbar from '../Navbar';


class TaskDistribution extends Component {
  constructor (props) {
    super(props);
    this.getUndistributedeTasks = this.getUndistributedeTasks.bind(this);
    this.getDistributedTasks = this.getDistributedTasks.bind(this);
    this.getTasksByTeam = this.getTasksByTeam.bind(this);
    this.renderDistributedTasks = this.renderDistributedTasks.bind(this);
  }

  componentWillMount() {
    this.props.fetchTeams(this.props.params.company_id);
    this.props.fetchTasksByCompany(this.props.params.company_id);
  }

  getUndistributedeTasks(tasks) {
    return tasks.filter(task => !task.team_id);
  }

  getDistributedTasks(tasks) {
    return tasks.filter(task => task.team_id);
  }

  getTasksByTeam(tasks, team_id) {
    return tasks.filter(task => task.team_id==team_id);
  }

  renderDistributedTasks(tasks) {
    var teams = this.props.teams || [];

    return teams.map( team => {
      <p>{ team.name }</p>;
      { <Tasks tasks={ this.getTasksByTeam(tasks, team.id) } />; }
    });
  }

  render() {
    const company_id = this.props.params.company_id;
    const tasks = this.props.tasks || [];
    const undistributedTasks = this.getUndistributedeTasks(tasks);
    const distributedTasks = this.getDistributedTasks(tasks);

    return (
      <div className="container">
        <Navbar />
        <div className="container">
          <Link className="btn" to={ '/distribution/'+company_id }>
            Employee Distribution</Link>
          <Link className="btn" to={ '/add_tasks/'+company_id }>
            Add tasks</Link>
        </div>
        <div className="row">
          <div className="col s6">
            <Tasks tasks={undistributedTasks} />
          </div>
          <div className="col s6">
            {this.renderDistributedTasks(distributedTasks)}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
(state) => ({
  tasks: state.tasks,
  teams: state.teams
}), { fetchTasksByCompany, fetchTeams })(TaskDistribution);
