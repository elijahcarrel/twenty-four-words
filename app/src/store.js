import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from 'state/root';

// Connect our store to the state
export default createStore(rootReducer, applyMiddleware(thunk, logger));
