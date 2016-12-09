let chai = require('chai');
global.expect = chai.expect;

import Actions from '../actions'
import * as Redux from 'redux'
import App from '../reducers'
import * as Immutable from 'immutable'

global.Actions = Actions;
global.Redux = Redux;
global.App = App;
global.Immutable = Immutable;
global.store = Redux.createStore(App.invoicingApp);