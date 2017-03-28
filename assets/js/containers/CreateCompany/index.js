import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { createCompany, getCompanies, deleteCompany } from '../../actions/company';
import CreateCompanyForm from '../../components/CreateCompanyForm';
import Navbar from '../Navbar';

type Props = {
  createCompany: () => void,
}

class CreateCompany extends Component {
  componentWillMount() {
    this.props.getCompanies();
  }
  
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleSignup = data => this.props.createCompany(data, this.context.router);

  handleDelete = (id) => () => this.props.deleteCompany(id);

  render() {
    var { companies, fetching_companies } = this.props.company;

    return (
      <DocumentTitle title="Create company">
        <div className="container">
          <Navbar />
          { companies.map(company => <div key={ company.id }>
            <span>{ company.name }</span>
            <button className="btn" onClick={ this.handleDelete(company.id) }>delete</button>
            </div>) }
          <CreateCompanyForm onSubmit={this.handleSignup} />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(
  (state) => ({
    company: state.company, 
  }), { createCompany, getCompanies, deleteCompany })(CreateCompany);
