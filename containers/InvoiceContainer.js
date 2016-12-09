import React from 'react';
import { connect } from 'react-redux';
import { addLineItem, updateTax } from '../actions';
import { SubtotalSelector, GrandTotalSelector } from '../selectors/index'
import { Invoice } from '../components/Invoice';

const mapStateToProps = (state) => {
  return {
    state: state,
    total: SubtotalSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTax: (newTax) => {
      dispatch(updateTax(newTax))
    }
  }
}

const InvoiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Invoice)

export default InvoiceContainer