import * as server from "../server/game";
import { handleResponse } from "./utils/handle-response";
import { pageNames } from "../page-names";
import { setPage } from "./page";

const actionTypes = {
  SET_GAME: "game/SET_GAME",
  SET_WORDS: "game/SET_WORDS",
};

export type Word = {
  word: string;
  createdBy: string;
}

export type GameState = {
  gameId: string;
  words: Word[];
}

const defaultState = {
  gameId: "",
  words: [{
    word: "Foo",
    createdBy: "Elijah",
  },
  {
    word: "Bar",
    createdBy: "Also Elijah",
  }],
};

export const gameState = (state = defaultState, action): GameState => {
  switch (action.type) {
    case actionTypes.SET_GAME: {
      const { gameId } = action;
      return {
        ...state,
        gameId,
      };
    }
    case actionTypes.SET_WORDS: {
      const { words } = action;
      return {
        ...state,
        words,
      };
    }
    default: {
      return state;
    }
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
    dispatch(setPage(pageNames.ADD_WORDS));
  };
};

export const setGame = (gameId) => ({
  type: actionTypes.SET_GAME,
  gameId,
});

export const setWords = (words) => ({
  type: actionTypes.SET_WORDS,
  words,
});

export const addWord = (word) => {
  return (dispatch, getState) => {
    const { gameState: { gameId } } = getState();
    server.addWord(word, gameId).then(handleResponse(dispatch, setWords));
  };
};

export const getWords = () => {
  return (dispatch, getState) => {
    const { gameState: { gameId } } = getState();
    server.getWords(gameId).then(handleResponse(dispatch, setWords));
  };
};

export const subscribeToWords = () => {
  return (dispatch, getState) => {
    const { gameState: { gameId } } = getState();
    return server.subscribeToWords(gameId, handleResponse(dispatch, setWords));
  }
};
