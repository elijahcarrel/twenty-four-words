// Combine all the state
import { combineReducers } from "redux";
import { userState } from "./user";
import { pageState } from "./page";
import { roomState } from "./room";
import { gameState } from "./game";
import { playerState } from "./player";
import { playersState } from "./players";

const rootReducer = combineReducers({
  userState,
  pageState,
  roomState,
  gameState,
  playerState,
  playersState,
});

export default rootReducer;
