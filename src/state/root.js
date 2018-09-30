// Combine all the state
import { combineReducers } from "redux";
import { userState } from "./user";
import { pageState } from "./page";
import { gameState } from "./game";
import { playersState } from "./players";

const rootReducer = combineReducers({
  userState,
  pageState,
  gameState,
  playersState,
});

export default rootReducer;
