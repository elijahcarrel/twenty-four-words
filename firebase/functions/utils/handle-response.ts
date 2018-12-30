/// TODO(ecarrel): probably delete this
export const handleResponse = (dispatch, successAction, failAction) => {
  return async ({ ok, result }) => {
    if (ok) {
      await dispatch(successAction(result));
      return result;
    }
    if (failAction) {
      await dispatch(failAction(result));
    }
  };
};
