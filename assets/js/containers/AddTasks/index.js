import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTasks, fetchTasks } from '../../actions/task';
import AddTasksForm from '../../components/AddTasksForm';

type Props = {
  addTasks: () => void,
}

class AddTasks extends Component {
  constructor (props) {
    super(props);
    this.getCompletedTasks = this.getCompletedTasks.bind(this);
    this.getUncompletedTasks = this.getUncompletedTasks.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  componentWillMount() {
    this.props.fetchTasks(this.props.params.company_id);
  }

  getCompletedTasks(tasks) {
    return tasks.filter(emp => !task.is_completed);
  }

  getUncompletedTasks(tasks) {
    return tasks.filter(emp => (task.is_completed));
  }

  handleAddTasks = data => this.props.addTasks({...data,
                                                company_id: this.props.company_id},
                                              this.context.router);

  render() {
    var company_id = this.props.params.company_id;
    var tasks = this.props.tasks;
    var completedTasks = this.getCompletedTasks(tasks);
    var uncompletedTasks = this.getUncompletedTasks(tasks);

    return (
      <div className="container">
        <Link className="btn" to="/distribution/:id">Employee distribution</Link>
        <Link className="btn" to="/manage_tasks/:company_id">Manage tasks</Link>
        <AddTasksForm onSubmit={this.handleAddTasks} />
          <div className="row">
            <div className="col s6">
              <Tasks tasks={ completedTasks }/>
            </div>
            <div className="col s6">
              <Tasks tasks={ uncompletedTasks }/>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    tasks: state.tasks,
  }), { addTasks, fetchTasks })(AddTasks);
