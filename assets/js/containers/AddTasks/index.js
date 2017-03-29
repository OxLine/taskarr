import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTasks } from '../../actions/task';
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
                                                company_id: this.props.company_id},
                                              this.context.router);

  render() {
    return (
      <div className="container">
        <Link className="btn" to="/distribution/:id">Employee distribution</Link>
        <Link className="btn" to="/manage_tasks/:company_id">Manage tasks</Link>
        <AddTasksForm onSubmit={this.handleAddTasks} />
      </div>
    );
  }
}

export default connect(null, { addTasks })(AddTasks);
