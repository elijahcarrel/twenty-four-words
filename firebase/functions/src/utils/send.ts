const wrapResult = (result) => ({
  ok: true,
  result,
});

const wrapError = (error) => {
  console.error(error);
  return {
    ok: false,
    error,
  }
};

export const sendClientError = (res, error) => {
  return res.status(400).json(wrapError(error));
};

export const sendResult = (res, result) => {
  return res.json(wrapResult(result));
};
