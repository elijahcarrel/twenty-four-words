// Combine all the state
import { combineReducers } from "redux";
import {UserState, userState} from "./user";
import {PageState, pageState} from "./page";
import {RoomState, roomState} from "./room";
import {GameState, gameState} from "./game";
import {PlayerState, playerState} from "./player";
import {PlayersState, playersState} from "./players";

export type RootState = {
  userState: UserState;
  pageState: PageState;
  roomState: RoomState;
  gameState: GameState;
  playerState: PlayerState;
  playersState: PlayersState;
}

const rootReducer = combineReducers<RootState>({
  userState,
  pageState,
  roomState,
  gameState,
  playerState,
  playersState,
});

export default rootReducer;
