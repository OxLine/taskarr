import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addTasks } from '../../actions/task';
import Navbar from '../Navbar';
import AddTaskPreview from '../../components/AddTaskPreview';
import AddTasksForm from '../../components/AddTasksForm';

type Props = {
  addTasks: () => void,
}

class AddTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleAddTasks = data => this.props.addTasks({...data,
                                                company_id: this.props.params.company_id},
                                              this.context.router);

  handleTextChange = (text) => {
    this.setState({text: text});
  }

  render() {
    const company_id = this.props.params.company_id;
    return (
      <div className="container">
        <Navbar />
        <Link className="btn" to={"/distribution/"+company_id}>Employee distribution</Link>
        <Link className="btn" to={"/manage_tasks/"+company_id}>Manage tasks</Link>
        <div className="row">
          <div className="col s6">
            <div className="card add-task">
              <AddTasksForm onTextChange={this.handleTextChange} onSubmit={this.handleAddTasks} />
            </div>
          </div>
          <div className="col s6">
            <AddTaskPreview text={this.state.text} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    tasks: state.tasks,
  }), { addTasks })(AddTasks);
