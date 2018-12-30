import * as server from "server/room";
import { handleResponse } from "utils/handle-response";

import { setTeam } from "state/user";
import { setPage } from "state/page";
import { pages } from "page-map";
import { setGame } from "./game";

export const actionTypes = {
  SET_ROOM: "room/SET_ROOM",
  SET_USERS: "room/SET_USERS",
};

const defaultState = {
  roomCode: "",
  roomId: "",
  users: [],
};

export const roomState = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROOM: {
      const {game: {roomCode, roomId}} = action;
      return {
        ...state,
        roomId,
        roomCode,
      };
    }
    case actionTypes.SET_USERS: {
      const {users} = action;
      return {
        ...state,
        users,
      };
    }
    default: {
      return state;
    }
  }
};

export const setRoomAndPage = ({ roomId, roomCode }) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_ROOM,
      roomId,
      roomCode,
    });
    dispatch(setPage(pages.ROOM))
  }
};

export const createRoom = (clientId, name) => {
  return (dispatch) => {
    server.createRoom(clientId, name).then(handleResponse(dispatch, setRoomAndPage));
  }
};

export const joinRoom = (roomCode, clientId, name) => {
  return (dispatch) => {
    server.joinRoom(roomCode, clientId, name).then(handleResponse(dispatch, setRoomAndPage));
  }
};

export const setUsers = (users) => ({
  type: actionTypes.SET_USERS,
  users,
});

export const getUsers = (roomId) => {
  return (dispatch) => {
    server.getUsers(roomId).then(handleResponse(dispatch, setUsers));
  }
};

export const addRoomListener = (roomId) => {
  return (dispatch) => {
    server.addRoomListener(roomId, handleResponse(dispatch, setGame));
  }
};
