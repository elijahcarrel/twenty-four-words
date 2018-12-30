// // Cut off time. Rooms older than this will be deleted.
// const CUT_OFF_TIME = 2 * 60 * 60 * 1000; // 2 Hours in milliseconds.
//
// /**
//  * This database triggered function will check for rooms that are older than the
//  * cut-off time. Each room needs to have a `timestamp` attribute.
//  *
//  * TODO(ecarrel): pretty sure this uses realtime database functions not firestore functions. Rewrite with
//  * firestore to make it actually work.
//  */
// exports.deleteOldRooms = functions.database.ref('/rooms/{pushId}').onWrite(async (change) => {
//   const ref = change.after.ref.parent; // reference to the parent
//   const now = Date.now();
//   const cutoff = now - CUT_OFF_TIME;
//   const oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
//   const snapshot = await oldItemsQuery.once('value');
//   // create a map with all children that need to be removed
//   const updates = {};
//   snapshot.forEach(child => {
//     updates[child.key] = null;
//   });
//   // execute all updates in one go and return the result to end the function
//   return ref.update(updates);
// });
//
// // Take the text parameter passed to this HTTP endpoint and insert it into the
// // Realtime Database under the path /messages/:pushId/original
// exports.startGame = functions.https.onRequest((req, res) => {
//   // Grab the roomId parameter.
//   const original = req.query.roomId;
//   // Check if the game has already been created.
//   functions.firestore.document
//   // Push the new message into the Realtime Database using the Firebase Admin SDK.
//   return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     return res.redirect(303, snapshot.ref.toString());
//   });
// });