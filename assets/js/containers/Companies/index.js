import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCompanies } from '../../actions/company';
import Company from '../Company';
import CreateCompany from '../CreateCompany';

class Companies extends Component {
  componentWillMount() {
    this.props.getCompanies();
  }

  render() {
    var { companies } = this.props.company;

    return (
      <div className="container">
        <div className="row">
        { companies.map(company =>
          <Company key={company.id} data={{...company}}/>
          ) }
        </div>
        <CreateCompany />
      </div>
    );
  }


}

export default connect(
  (state) => ({
    company: state.company,
  }), { getCompanies })(Companies);
