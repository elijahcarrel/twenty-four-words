import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Home } from './home';
import { initDbConnection } from "./server/init";

export const App = () => {
  useEffect(() => {
    initDbConnection();
  }, []);

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
