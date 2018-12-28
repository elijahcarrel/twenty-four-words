import uuid from "uuid";

export const actionTypes = {
  SET_NAME: "user/SET_NAME",
  SET_TEAM: "user/SET_TEAM",
};

const defaultState = {
  name: "",
  clientId: uuid.v4(),
  team: -1,
};

export const userState = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      const { name } = action;
      return {
        ...state,
        name,
      };
    case actionTypes.SET_TEAM:
      const { team } = action;
      return {
        ...state,
        team,
      };
    default:
      return state;
  }
};

export const setName = (name) => ({
  type: actionTypes.SET_NAME,
  name,
});

export const setTeam = (team) => ({
  type: actionTypes.SET_TEAM,
  team,
});
