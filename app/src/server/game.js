import { putJson } from "./utils/fetching";
import { db, userId } from "./init";
import { serverTimestamp } from "./utils/server-timestamp";
import {wrapError, wrapResult} from "./utils/wrapping";

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
    return wrapError(`Error adding word ${word}.`);
  }
  return getWords(gameId);
};

const interpretWords = (docs) => {
  console.log(`I'm being told to interpret words which are ${JSON.stringify(docs)}`);
  const results = [];
  docs.forEach(async qds => {
    const userRef = qds.get("createdBy");
    if (!userRef) {
      // TODO(ecarrel): make sure that a return statement inside of a forEach does what I think it does... huh I think
      // this doesn't work actually.
      return wrapError("Error getting createdBy field of word.");
    }
    const user = await userRef.get();
    const createdBy = user.get("name");
    results.push({
      word: qds.get("name"),
      createdBy,
    });
  });
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
