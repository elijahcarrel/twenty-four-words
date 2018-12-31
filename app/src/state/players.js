import * as server from "server/players";
import { handleResponse } from "./utils/handle-response";

export const actionTypes = {
  GET_PLAYERS: "players/GET_PLAYERS",
  SET_PLAYERS: "players/SET_PLAYERS",
};

const defaultState = {
  players: [],
};

export const playersState = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_PLAYERS:
      const { players } = action;
      return {
        ...state,
        players,
      };
    default:
      return state;
  }
};

export const setPlayers = (players) => ({
  type: actionTypes.SET_PLAYERS,
  players,
});

export const getPlayers = (gameId) => {
  return (dispatch) => {
    server.getPlayers(gameId).then(handleResponse(dispatch, setPlayers));
  }
};
