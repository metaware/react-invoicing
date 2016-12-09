let numeral = require('numeral');

let addLineItem = () => {
  return {
    type: 'ADD_LINE_ITEM'
  }
}

let deleteLineItem = (lineItemId) => {
  return {
    type: 'DELETE_LINE_ITEM',
    lineItemId: lineItemId
  }
}

let updateTax = (taxPercentage) => {
  return {
    type: 'UPDATE_TAX',
    taxPercentage: numeral(taxPercentage)
  }
}

let updateLineItem = (id, lineItem) => {
  return {
    type: 'UPDATE_LINE_ITEM',
    lineItemId: id,
    lineItem: lineItem
  }
}

let updateInvoiceNumber = (newNumber) => {
  return {
    type: 'UPDATE_INVOICE_NUMBER',
    number: newNumber
  }
}

export default {
  addLineItem,
  deleteLineItem,
  updateTax,
  updateLineItem,
  updateInvoiceNumber
}