export const wrapResult = (result) => ({
  ok: true,
  result,
});

export const wrapError = (error) => {
  return {
    ok: false,
    error,
  }
};
