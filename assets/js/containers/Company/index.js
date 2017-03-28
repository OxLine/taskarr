import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteCompany } from '../../actions/company';

class Company extends Component {
  handleDelete = (e) => {
    e.preventDefault();
    var id = this.props.data.id;
    this.props.deleteCompany(id);
  }

  render() {
    var { name } = this.props.data;

    return (
      <div className="col s6 m4">
        <div className="card">
          <div className="card-content">{ name }</div>
          <div className="card-action">
            <a onClick={ this.handleDelete } href="">delete</a>
          </div>
        </div>
      </div>
    )
  }

}


export default connect(
  (state) => ({
    company: state.company,
}), { deleteCompany })(Company);
