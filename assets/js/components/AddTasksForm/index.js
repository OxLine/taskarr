import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class AddTasksForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            name="tasks"
            type="text"
            component={Input}
            placeholder="Tasks text"
            className="form-control"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn"
          >
            {submitting ? 'In progress...' : 'Add'}
          </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.tasks) {
    errors.tasks = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'addTasks',
  validate,
})(AddTasksForm);
