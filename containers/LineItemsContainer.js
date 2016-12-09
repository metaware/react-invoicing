import React from 'react';
import { connect } from 'react-redux';
import { addLineItem, updateLineItem } from '../actions';

import { LineItems } from '../components/LineItems';

const mapStateToProps = (state) => {
  return {
    items: state.lineItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLineItemAdd: () => {
      dispatch(addLineItem())
    },
    onLineItemUpdate: (id, lineItem) => {
      dispatch(updateLineItem(id, lineItem))
    }
  }
}

const LineItemsContainer= connect(
  mapStateToProps,
  mapDispatchToProps
)(LineItems)

export default LineItemsContainer