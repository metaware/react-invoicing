import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { MainMenu } from './components/MainMenu';
import InvoiceContainer from './containers/InvoiceContainer';
import Pretty from './components/Pretty';
import enUS from 'antd/lib/locale-provider/en_US';
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { invoicingApp } from './reducers'

const logger = createLogger()
let store = createStore(
  invoicingApp,
  applyMiddleware(logger)
)

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
  }

  render() {
    return (
      <div>
        <MainMenu/>
        <InvoiceContainer/>
      </div>
    );
  }

}

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </Provider>, 
  document.getElementById('root')
);