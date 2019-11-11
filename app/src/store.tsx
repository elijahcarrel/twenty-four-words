import {createStore, applyMiddleware, Action} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer, {RootState} from "./state/root";

// Connect our store to the state
export default createStore<RootState, Action<any>, unknown, unknown>(rootReducer, applyMiddleware(thunk, logger));
