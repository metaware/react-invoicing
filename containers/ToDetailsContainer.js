import React from 'react';
import { connect } from 'react-redux';
import { updateInvoiceNumber } from '../actions';

import { ToDetails } from '../components/ToDetails';

const mapStateToProps = (state) => {
  return {
    invoiceNumber: state.number,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInvoiceNumberChange: (newNumber) => {
      dispatch(updateInvoiceNumber(newNumber))
    }
  }
}

const ToDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDetails)

export default ToDetailsContainer