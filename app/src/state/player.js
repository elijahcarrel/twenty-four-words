export const actionTypes = {
  SET_TEAM: "player/SET_TEAM",
};

const defaultState = {
  team: -1,
};

export const playerState = (state = defaultState, action) => {
  switch (action.type) {
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

export const setTeam = (team) => ({
  type: actionTypes.SET_TEAM,
  team,
});
