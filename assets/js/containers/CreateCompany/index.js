import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { createCompany } from '../../actions/session';
import SignupForm from '../../components/CreateCompanyForm';
import Navbar from '../Navbar';

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
      <DocumentTitle title="Create company">
        <div className="container">
          <Navbar />
          <CreateCompanyForm onSubmit={this.handleSignup} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(null, { createCompany })(CreateCompany);
