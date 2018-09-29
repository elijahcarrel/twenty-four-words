export const ADD_WORD = 'ADD_WORD';

export const addWord = (word) => {
  return (dispatch) => {
    dispatch({
      type: ADD_WORD,
      word: word,
    });
  };
};
