import { db } from "./index";
import { sendClientError, sendResult } from "./utils/send";
import { serverTimestamp } from "./utils/server-timestamp";

export const startGame = async (req, res) => {
  const roomId = req.params.roomId;
  const roomDoc = await db.collection('rooms').doc(roomId).get();
  if (!roomDoc.exists) {
    sendClientError(res, `Could not find room ${roomId}.`);
    return;
  }
  let gameRef = roomDoc.data().game;
  if (gameRef !== undefined) {
    sendClientError(res, `The game has already started.`);
    return;
  }
  const usersInRoom = await db.collection('users')
  .where('room', '==', roomId)
  .get();
  if (!usersInRoom) {
    sendClientError(res, "Unknown DB error.");
    return;
  }
  const {docs} = usersInRoom;
  if (docs.length !== 2) {
    sendClientError(res, `Currently, 24words only supports games of exactly two players.`);
    return;
  }
  const batch = db.batch();
  gameRef = db.collection('games').doc();
  batch.set(gameRef, {
    createTime: serverTimestamp(),
  });
  docs.forEach((user, i) => {
    const playerRef = db.collection('players').doc();
    batch.set(playerRef, {
      game: gameRef.id,
      user: user.id,
      team: i % 2,
    });
  });
  const roomRef = db.collection('rooms').doc(roomId);
  batch.update(roomRef, {
    game: gameRef.id,
  });
  const err = await batch.commit();
  if (err) {
    sendClientError(res, `Database error: ${err}.`);
    return;
  }
  sendResult(res, { gameId: gameRef.id });
  return;
};
