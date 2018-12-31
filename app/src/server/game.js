import { putJson } from "./utils/fetching";
import { db, userId } from "./init";
import { serverTimestamp } from "./utils/server-timestamp";

export const startGame = (roomId) => {
  return putJson(`/rooms/${roomId}/start`);
};

export const addWord = async (word, gameId) => {
  const { id } = await db.collection("words").add({
    word,
    game: `/game/${gameId}`,
    createdBy: `/users/${userId}`,
    createTime: serverTimestamp(),
  });
  if (!id) {
    console.error(`Error adding word ${word}.`);
    return;
  }
  return getWords(gameId);
};

const interpretWords = (docs) => {
  return {
    ok: true,
    result: docs.map(async qds => {
      const userRef = qds.get("createdBy");
      if (!userRef) {
        console.error("Error getting createdBy field of word.");
        return;
      }
      const user = await userRef.get();
      const createdBy = user.data().name;
      return {
        word: qds.get("name"),
        createdBy,
      };
    }),
  };
};

export const getWords = (gameId) => {
  return db.collection("words")
    .where("game", "==", `/games/${gameId}`)
    .get()
    .then(({ docs }) => interpretWords(docs));
};

export const subscribeToWords = (gameId, callback) => {
  return db.collection("words")
    .where("game", "==", `/games/${gameId}`)
    .onSnapshot(
      docs => callback(interpretWords(docs)),
      error => {
        console.error(`Error adding room listener: ${error}.`)
      });
};
