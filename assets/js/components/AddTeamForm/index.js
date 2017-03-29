import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class CreateCompanyForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            name="name"
            type="text"
            component={Input}
            placeholder="team name"
            className="form-control"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn"
          >
            {submitting ? 'In progress...' : 'Add Team'}
          </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'addTeam',
  validate,
})(CreateCompanyForm);
