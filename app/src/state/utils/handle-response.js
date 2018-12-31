export const handleResponse = (dispatch, successAction, failAction) => {
  return async ({ ok, result, error }) => {
    if (ok) {
      await dispatch(successAction(result));
      return result;
    }
    if (failAction) {
      await dispatch(failAction(error));
    } else {
      console.error(error);
    }
  };
};
