import * as server from "../server/user";
import { handleResponse } from "./utils/handle-response";

export type UserState = {
  name: string;
}

const actionTypes = {
  SET_NAME: "user/SET_NAME",
};

const defaultState = {
  name: "",
};

export const userState = (state = defaultState, action): UserState => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      const { name } = action;
      return {
        ...state,
        name,
      };
    default:
      return state;
  }
};

export const setName = ({ name }: { name: String }) => ({
  type: actionTypes.SET_NAME,
  name,
});

export const saveName = (name) => {
  return (dispatch) => {
    server.saveName(name).then(handleResponse(dispatch, setName));
  }
};
