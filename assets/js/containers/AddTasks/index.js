import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addTasks } from '../../actions/task';
import Navbar from '../Navbar';
import AddTasksForm from '../../components/AddTasksForm';

type Props = {
  addTasks: () => void,
}

class AddTasks extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleAddTasks = data => this.props.addTasks({...data,
                                                company_id: this.props.params.company_id},
                                              this.context.router);

  render() {
    console.log('KAPPA');
    return (
      <div className="container">
        <Navbar />
        <Link className="btn" to="/distribution/:id">Employee distribution</Link>
        <Link className="btn" to="/manage_tasks/:company_id">Manage tasks</Link>
        <AddTasksForm onSubmit={this.handleAddTasks} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    tasks: state.tasks,
  }), { addTasks })(AddTasks);
