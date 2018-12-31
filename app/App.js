import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import { Home } from './src/home';
import { initDbConnection } from "./src/server/init";

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
