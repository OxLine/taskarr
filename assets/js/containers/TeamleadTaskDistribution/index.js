import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchTasksByTeam } from '../../actions/task';
import { fetchEmployeesByTeam } from '../../actions/task';
import Tasks from '../Tasks';
import Navbar from '../Navbar';


class TeamleadTaskDistribution extends Component {
  constructor (props) {
    super(props);
    this.getUndistributedeTasks = this.getUndistributedeTasks.bind(this);
    this.getDistributedTasks = this.getDistributedTasks.bind(this);
    this.getTasksByEmployee = this.getTasksByEmployee.bind(this);
    this.renderDistributedTasks = this.renderDistributedTasks.bind(this);
  }

  componentWillMount() {
    const {company_id, team_id} = this.props.params;
    this.props.fetchEmployeesByTeam(company_id, team_id);
    this.props.fetchTasksByTeam(company_id);
  }

  getUndistributedeTasks(tasks) {
    return tasks.filter(task => !task.user_id);
  }

  getDistributedTasks(tasks) {
    return tasks.filter(task => task.user_id);
  }

  getTasksByUser(tasks, user_id) {
    return tasks.filter(task => task.user_id==user_id);
  }

  renderDistributedTasks(tasks) {
    var employees = this.props.employees || [];

    return employees.map( employee => {
      <p>{ employee.username }</p>;
      { <Tasks tasks={ this.getTasksByEmployee(tasks, employee.id) } />; }
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
  employees: state.employees
}), { fetchTasksByTeam, fetchEmployeesByTeam })(TeamleadTaskDistribution);
