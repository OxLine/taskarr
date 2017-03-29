import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addEmployee } from '../../actions/employee';
import AddEmployeeForm from '../../components/AddEmployeeForm';

type Props = {
  addEmployee: () => void,
}

class AddEmployee extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleAddEmployee= data => this.props.addEmployee({...data, company_id: this.props.company_id}, this.context.router);

  render() {
    return (
      <div className="container">
        <AddEmployeeForm onSubmit={this.handleAddEmployee} />
      </div>
    );
  }
}

export default connect(null, { addEmployee })(AddEmployee);
