// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import Input from '../Input';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class SignupForm extends Component {
  props: Props

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h3>Create an account</h3>
        <Field
          name="username"
          type="text"
          component={Input}
          placeholder="Username"
          className="form-control"
        />
        <Field
          name="email"
          type="email"
          component={Input}
          placeholder="Email"
          className="form-control"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="Password"
          className="form-control"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn"
        >
          {submitting ? 'Submitting...' : 'Sign up'}
        </button>
        <hr />
        <Link to="/Login" className="btn">
          Login to your account
        </Link>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate,
})(SignupForm);
