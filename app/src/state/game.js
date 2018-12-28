import * as server from "server/game";
import { handleResponse } from "utils/handle-response";

import { setTeam } from "state/user";
import { setPage } from "state/page";

export const actionTypes = {
  GET_NEW_GAME_ID: "game/GET_NEW_GAME_ID",
  SET_GAME: "game/SET_GAME",
};

const defaultState = {
  gameCode: "",
  gameId: "",
};

export const gameState = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAME:
      const { game: { gameCode, gameId } } = action;
      return {
        ...state,
        gameId,
        gameCode,
      };
    default:
      return state;
  }
};

export const setGameTeamAndPage = ({ gameId, gameCode, team }) => {
  setGame({ gameId, gameCode });
  setTeam(team);
  setPage("players-join");
};

export const setGame = (game) => ({
  type: actionTypes.SET_GAME,
  game,
});

export const createNewGame = (clientId, name) => {
  return (dispatch) => {
    server.createNewGame(clientId, name).then(handleResponse(dispatch, setGameTeamAndPage));
  }
};

export const joinGame = (gameCode, clientId, name) => {
  return (dispatch) => {
    server.joinGame(gameCode, clientId, name).then(handleResponse(dispatch, setGameTeamAndPage));
  }
}