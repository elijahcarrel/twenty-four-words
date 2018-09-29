import { combineReducers } from 'redux';

import { ADD_WORD } from "../actions"; // Import the actions types constant we defined in our actions

let dataState = { loading: false, words: [] };

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case ADD_WORD:
      return {
        ...state,
        words: [...state.words, action.word],
      };
    default:
      return state;
  }
};

// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
