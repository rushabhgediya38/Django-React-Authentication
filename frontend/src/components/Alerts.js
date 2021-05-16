import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'


export class Alerts extends Component {
 static propTypes = {
  error: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
 }

 componentDidUpdate(prevProps) {
  const { error, alert, message } = this.props;
  if (error !== prevProps.error) {
   // alert.error('There is alert');
   if (error.msg.detail) alert.error(`${error.msg.detail}`);
   if (error.msg.email) alert.error(`email: ${error.msg.email}`);
   if (error.msg.name) alert.error(`name: ${error.msg.name}`);
   if (error.msg.password) alert.error(`password: ${error.msg.password}`);
   if (error.msg.token) alert.error(`token: ${error.msg.token}`);
   if (error.msg.uid) alert.error(`uid: ${error.msg.uid}`);

   if (error.msg.new_password) alert(`${error.message.new_password}`);

  }

  // reset password
  if (error.msg !== prevProps.error.msg) {
   if (error.msg) alert.error(`${error.msg}`);
  }

  // success 
  if (message !== prevProps.message){

   if (message.leadAdded) alert.success(message.leadAdded);
   if (message.activateSuccess) alert.success(message.activateSuccess);
   if (message.signupSuccess) alert.success(message.signupSuccess);
   if (message.resetSuccess) alert.success(message.resetSuccess);
   if (message.resetPassConf) alert.success(message.resetPassConf);
   if (message.logoutSucc) alert.success(message.logoutSucc);
  }
 }
 render() {
  return <Fragment />
 }
}

const mapStateToProps = state => ({
 error: state.errors,
 message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts))
