import { pageNames } from "~/page-names";

const actionTypes = {
  SET_PAGE: "page/SET_PAGE",
};

const defaultState = {
  page: pageNames.ENTER_NAME,
};

export const pageState = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE: {
      const { page } = action;
      return {
        ...state,
        page,
      };
    }
    default: {
      return state;
    }
  }
};

export const setPage = (page) => ({
  type: actionTypes.SET_PAGE,
  page,
});

console.log("In page.js and setPage is ", setPage);
