// @flow
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
        <h3>Create a company</h3>
          <Field
            name="name"
            type="text"
            component={Input}
            placeholder="Company name"
            className="form-control"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.companyName) {
    errors.companyName = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'createCompany',
  validate,
})(CreateCompanyForm);
