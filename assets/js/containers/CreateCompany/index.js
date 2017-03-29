import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createCompany } from '../../actions/company';
import CreateCompanyForm from '../../components/CreateCompanyForm';

type Props = {
  createCompany: () => void,
}

class CreateCompany extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSignup = data => this.props.createCompany(data, this.context.router);

  render() {
    return (
      <div className="container">
        <CreateCompanyForm onSubmit={this.handleSignup} />
      </div>
    );
  }
}

export default connect(null, { createCompany })(CreateCompany);
