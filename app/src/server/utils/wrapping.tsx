export const wrapResult = (result) => ({
  ok: true,
  result,
  error: null,
});

export const wrapError = (error) => {
  return {
    ok: false,
    error,
    result: null,
  }
};
