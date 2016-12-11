import { combineReducers } from 'redux';
import { Map, List } from 'immutable';

let numeral = require('numeral');
let uuid = require('uuid');

const initialState = Map({
  number: 1,
  currency: 'USD',
  subTotal: numeral(0),
  taxPercentage: numeral(0),
  grandTotal: numeral(0),
  fromCompany: Map({
    name: 'Metaware Labs Inc',
    address: Map({
      streetName: '1 Yonge St',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M5E 1W7'
    })
  }),
  toCompany: Map({
    name: '',
    address: Map({})
  }),
  lineItems: List()
})

let defaultCompany = Map({
    name: 'Metaware Labs Inc',
    address: Map({
      streetName: '1 Yonge St',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M5E 1W7'
    })
  })

let defaultToCompany = Map({
    name: '',
    address: Map({})
  })

let taxPercentageReducer = (state = numeral(0), action) => {
  switch(action.type) {
    case 'UPDATE_TAX':
      return action.taxPercentage;
    default:
      return state;
  }
}

let lineItemReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_LINE_ITEM':
      let quantity = action.lineItem.get('quantity')
      let cost = action.lineItem.get('cost')
      var newState = Map({
        cid: action.lineItem.get('cid'),
        total: numeral(quantity.value() * cost.value()),
        quantity: quantity,
        cost: cost,
        description: action.lineItem.get('description')
      })
      return newState;
    default:
      return state;
  }
}

let lineItemsReducer = (state = List(), action) => {
  switch(action.type) {
    case 'ADD_LINE_ITEM':
      let newLineItem = Map({ cid: uuid.v4(), description: null, quantity: numeral(0), cost: numeral(0.0), total: numeral(0.0) })
      return state.push(newLineItem);
    case 'DELETE_LINE_ITEM':
      var newLineItems = state.filterNot((lineItem) => {
        return lineItem.get('cid') == action.lineItemId;
      });
      return newLineItems
    case 'UPDATE_LINE_ITEM':
      let lineItem = state.find((lineItem) => {
        return lineItem.get('cid') == action.lineItemId;
      })
      let index = state.findIndex((lineItem) => {
        return lineItem.get('cid') == action.lineItemId;
      })
      return state.set(index, lineItemReducer(lineItem, action))
    default: 
      return state;
  }
}

let invoicingApp = function(state = {}, action) {
  return {
    subTotal: numeral(0),
    taxPercentage: taxPercentageReducer(state.taxPercentage, action),
    lineItems: lineItemsReducer(state.lineItems, action),
    grandTotal: numeral(0),
    number: 1,
    currency: function(state = 'USD', action) {
      return state
    }(state.currency, action),
    fromCompany: function(state = defaultCompany, action) {
      return state
    }(state.fromCompany, action),
    toCompany: function(state = defaultToCompany, action) {
      return state
    }(state.toCompany, action)
  }
}

export default {
  invoicingApp
}