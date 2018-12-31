export const sendClientError = (res, error) => {
  return res.status(400).json({error});
};
export const sendResult = (res, result) => {
  return res.json({result});
};
