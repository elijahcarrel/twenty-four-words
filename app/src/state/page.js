export const actionTypes = {
  SET_PAGE: "page/SET_PAGE",
};

const defaultState = {
  page: "",
};

export const pageState = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      const { page } = action;
      return {
        ...state,
        page,
      };
    default:
      return state;
  }
};

export const setPage = (page) => ({
  type: actionTypes.SET_PAGE,
  page,
});
