require('./spec_helper.js');
let numeral = require('numeral');

describe('Invoicing', () => {

  let lineItem = Immutable.Map({
    description: 'Accounting Consulting',
    quantity: numeral(2),
    cost: numeral(75)
  })

  context('store initialization', () => {

    it('should initialize with a 0 subtotal', () => {
      let store = Redux.createStore(App.invoicingApp);
      let state = store.getState()
      expect(state.subTotal.value()).to.eq(0)
    })

    it('should initialize with a 0 grandtotal', () => {
      let store = Redux.createStore(App.invoicingApp);
      let state = store.getState()
      expect(state.grandTotal.value()).to.eq(0)
    })

  })

  context('add line item', () => {

    it('when adding a single line item', () => {
      let store = Redux.createStore(App.invoicingApp);
      store.dispatch(Actions.addLineItem())
      let state = store.getState()
      expect(state.lineItems.size).to.eq(1)
    })

    it('when adding multiple line item', () => {
      let store = Redux.createStore(App.invoicingApp);
      store.dispatch(Actions.addLineItem())
      store.dispatch(Actions.addLineItem())
      store.dispatch(Actions.addLineItem())
      let state = store.getState()
      expect(state.lineItems.size).to.eq(3)
    })

  })

  context('update line item', () => {

    context('update line item total', () => {

      it('when adding a single line item', () => {
        let store = Redux.createStore(App.invoicingApp);
        store.dispatch(Actions.addLineItem(lineItem))
        var state = store.getState()
        expect(state.lineItems.first().get('total').value()).to.eq(0)

        let lineItemId = store.getState().lineItems.first().get('cid')
        store.dispatch(Actions.updateLineItem(lineItemId, lineItem))
        var state = store.getState()
        expect(state.lineItems.first().get('total').value()).to.eq(150.00)
      })

    })

  })

  context('delete line item', () => {
    
    it('when deleting a single line item', () => {
      let store = Redux.createStore(App.invoicingApp);
      store.dispatch(Actions.addLineItem())
      store.dispatch(Actions.addLineItem())
      let lineItemId = store.getState().lineItems.first().get('cid');
      store.dispatch(Actions.deleteLineItem(lineItemId))
      let state = store.getState()
      expect(state.lineItems.size).to.eq(1)
    })

  })

  context('update tax', () => {

    it('should update the tax', () => {
      let store = Redux.createStore(App.invoicingApp);
      store.dispatch(Actions.addLineItem())
      store.dispatch(Actions.addLineItem())
      store.dispatch(Actions.updateTax(13))
      let state = store.getState()
      expect(state.taxPercentage.value()).to.eq(13.00)
    })

  })

  context('add toCompany name and address', () => {
    
  })

})