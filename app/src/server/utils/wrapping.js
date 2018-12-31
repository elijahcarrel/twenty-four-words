export const wrapResult = (result) => ({
  ok: true,
  result,
});

export const wrapError = (error) => {
  console.error(error);
  return {
    ok: false,
    error,
  }
};
