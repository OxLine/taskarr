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

  handleDelete = (id) => (e) => {
    e.preventDefault();
    this.props.deleteCompany(id);
  }

  render() {
    var { companies, fetching_companies } = this.props.company;

    return (
      <DocumentTitle title="Create company">
        <div className="container">
          <Navbar />
          <div className="row">
          { companies.map(company => 
            <div className="col s6 m4">
              <div className="card">
                <div className="card-content">{ company.name }</div>
                <div className="card-action">
                  <a onClick={ this.handleDelete(company.id) } href="">delete</a>
                </div>
              </div>
            </div>) }
          </div>
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
