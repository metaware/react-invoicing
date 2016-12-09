import { createSelector } from 'reselect';
let numeral = require('numeral');

const getLineItems = (state) => state.lineItems;
const getSubtotal = (state) => state.subTotal;
const getTax = (state) => state.taxPercentage;

const computeTotals = (lineItems, tax) => {
  let subTotal = lineItems.reduce((initial, lineItem) => {
    return numeral( (initial.value() || 0) + (lineItem.get('total').value() || 0) )
  }, numeral(0));
  let totalTax = numeral( subTotal.value() * tax.value()/100 )
  let grandTotal = numeral( subTotal.value() + totalTax.value() );
  return {
    subTotal,
    totalTax,
    grandTotal
  }
}

const SubtotalSelector = createSelector(
  getLineItems,
  getTax,
  computeTotals
)

export default {
  SubtotalSelector
}