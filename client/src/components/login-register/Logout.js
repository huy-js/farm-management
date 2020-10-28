import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../../trainRedux/action/actionAuth';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  onLogout : () => dispatch(actions.authLogout())
});

export default connect(null, mapDispatchToProps)(Logout);
