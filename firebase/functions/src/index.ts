'use strict';

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from 'body-parser';
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const app = express();
const main = express();
main.use('/api/v1', app);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
// webApi is your functions name, and you will pass main as
// a parameter
export const webApi = functions.https.onRequest(main);

app.put('/rooms/:roomId/start', async (req, res) => {
  const roomId = req.params.roomId;
  const roomDoc = await firebaseHelper.firestore
  .getDocument(db, 'rooms', roomId);
  if (!roomDoc.exists) {
    res.status(404).send({error: `Could not find room ${roomId}.`});
    return;
  }
  let gameRef = roomDoc.data().game;
  // TODO(ecarrel): fix race condition where two people press start at same time. Probably better to put all of this
  // in a transaction.
  if (gameRef === undefined) {
    gameRef = db.collection('games').doc().set({
      createTime: firebaseHelper.firestore.FieldValue.serverTimestamp(),
    });
    const usersInRoom = await db.collection('users')
    .where('room', '==', roomId)
    .get();
    if (!usersInRoom) {
      res.status(400).send({error: "Unknown DB error."});
      return;
    }
    const {docs} = usersInRoom;
    if (docs.length !== 4) {
      res.status(400).send({error: `Currently, 24words only supports games of exactly four players.`});
      return;
    }
    const batch = db.batch();
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
      res.status(400).send({error: `Database error: ${err}.`});
      return;
    }
    res.send(gameRef.id);
    return;
  } else {
    res.status(400).send({error: `The game has already started.`});
    return;
  }
});
