import { putJson } from "./utils/fetching";
import { db, userId } from "./init";
import { serverTimestamp } from "./utils/server-timestamp";
import {wrapError, wrapResult} from "./utils/wrapping";

export const startGame = async (roomId) => {
  return await putJson(`/rooms/${roomId}/start`);
};

export const addWord = async (word, gameId) => {
  const { id } = await db.collection("words").add({
    word,
    game: `/game/${gameId}`,
    createdBy: `/users/${userId}`,
    createTime: serverTimestamp(),
  });
  if (!id) {
    return wrapError(`Error adding word ${word}.`);
  }
  return getWords(gameId);
};

const interpretWords = (docs) => {
  console.log(`I'm being told to interpret words which are ${JSON.stringify(docs)}`);
  const results = docs.map(async qds => {
    const userRef = qds.get("createdBy");
    if (!userRef) {
      return wrapError("Error getting createdBy field of word.");
    }
    const user = await userRef.get();
    const createdBy = user.get("name");
    return {
      word: qds.get("name"),
      createdBy,
    };
  });
  if (results.some(result => result.error !== undefined)) {
    return results.find(result => result.error !== undefined)
  }
  return wrapResult(results);
};

export const getWords = async (gameId) => {
  const { docs } = await db.collection("words")
    .where("game", "==", `/games/${gameId}`)
    .get();
  return interpretWords(docs);
};

export const subscribeToWords = (gameId, callback) => {
  return db.collection("words")
    .where("game", "==", `/games/${gameId}`)
    .onSnapshot(
      docs => callback(interpretWords(docs)),
      error => wrapError(`Error adding room listener: ${error}.`),
     );
};
