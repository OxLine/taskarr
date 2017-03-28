import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Employee extends Component {
  render() {
    var { login } = this.props.data;

    return (
      <div className="col s6 m4">
        <div className="card">
          <div className="card-content">{ login }</div>
          <div className="card-action">
            X
          </div>
          <div className="card-action">
            Y
          </div>
          <div className="card-action">
            I
          </div>
        </div>
      </div>
    )
  }
}


export default connect()(Employee);
