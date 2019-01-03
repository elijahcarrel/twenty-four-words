import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import { Home } from './home';
import { initDbConnection } from "./server/init";

export default class App extends Component {
  componentDidMount() {
    initDbConnection();
  }
  
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
