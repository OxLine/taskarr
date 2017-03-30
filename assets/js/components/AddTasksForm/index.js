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

  handleTextChange = (value) => {
    this.props.onTextChange(value);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            name="tasks"
            type="textarea"
            component="textarea"
            placeholder="Tasks text"
            onChange={value => {
              this.handleTextChange(value.target.value);
            }}
            ref="text"
            className="form-control input-field materialize-textarea"
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
