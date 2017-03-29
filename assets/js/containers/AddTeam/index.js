import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTeam } from '../../actions/team';
import AddTeamForm from '../../components/AddTeamForm';

type Props = {
  addTeam: () => void,
}

class AddTeam extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleAddTeam = data => this.props.addTeam({...data, company_id: this.props.company_id}, this.context.router);

  render() {
    return (
      <div className="container">
        <AddTeamForm onSubmit={this.handleAddTeam} />
      </div>
    );
  }
}

export default connect(null, { addTeam })(AddTeam);
