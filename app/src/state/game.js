import * as server from "server/game";
import { handleResponse } from "../server/utils/handle-response";

export const actionTypes = {
  SET_GAME: "game/SET_GAME",
};

const defaultState = {
  gameId: "",
};

export const gameState = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAME:
      const { gameId } = action;
      return {
        ...state,
        gameId,
      };
    default:
      return state;
  }
};

export const startGame = (roomId) => {
  return (dispatch) => {
    server.startGame(roomId).then(handleResponse(dispatch, setGameAndPage));
  };
};

export const setGameAndPage = (gameId) => {
  return (dispatch) => {
    dispatch(setGame(gameId));
    dispatch(setPage(pages.PLAY));
  };
};

export const setGame = (gameId) => ({
  type: actionTypes.SET_GAME,
  gameId,
});
