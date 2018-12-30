import uuid from "uuid";

export const actionTypes = {
  SET_NAME: "user/SET_NAME",
};

const defaultState = {
  name: "",
  clientId: uuid.v4(),
};

export const userState = (state = defaultState, action) => {
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

export const setName = (name) => ({
  type: actionTypes.SET_NAME,
  name,
});
