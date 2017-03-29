// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

type Props = {
  isAuthenticated: boolean,
  willAuthenticate: boolean,
}

class MatchAuthenticated extends Component {
  props: Props

  constructor (props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.render_or_redirect = this.render_or_redirect.bind(this);
  }
  //componentDidMount() {
  //  const { dispatch, isAuthenticated, willAuthenticate } = this.props;

  //  if ( !isAuthenticated && !willAuthenticate ) {
  //    dispatch(push('/login'));
  //  }
  //}

  //componentDidUpdate(prevProps, prevState) {
  //  const { dispatch, isAuthenticated, willAuthenticate } = this.props;

  //  if ( !isAuthenticated && !willAuthenticate ) {
  //    dispatch(push('/login'));
  //  }
  //}
  componentWillMount() {
    const { dispatch, isAuthenticated, willAuthenticate } = this.props;
    if ( !isAuthenticated && !willAuthenticate ) {
      dispatch(push('/login'));
    }
  }

  render_or_redirect() {
    const { dispatch, isAuthenticated, willAuthenticate } = this.props;

    if (isAuthenticated) {
      return ( <div>{ this.props.children }</div>);
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        { this.render_or_redirect() }
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
  })
)(MatchAuthenticated);
