import { db, userId } from "./init"
import { serverTimestamp } from "./utils/server-timestamp";

const generateRoomCode = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getValidRoomCode = () => {
  // TODO(ecarrel): rewrite this logic entirely so that the database instead keeps track of all 26^4
  // possible game IDs and then we just order them by last used and pick the one least recently used.
  // If I ever break this then this function might might send infinite requests to firebase...
  const roomCode = generateRoomCode();
  return db.collection("rooms")
    .where("code", "==", roomCode)
    .where("active", "==", true)
    .limit(1)
    .get()
    .then(({ empty }) => {
      // console.error(`Just asked firebase if ${roomCode} was unique and it said: ${empty}.`);
      return empty ? roomCode : getValidRoomCode();
    });
};

export const createRoom = () => {
  return getValidRoomCode().then(async roomCode => {
    const { id } = await db.collection("rooms").add({
      code: roomCode,
      active: true,
      createdBy: `/users/${userId}`,
      createTime: serverTimestamp(),
    });
    const success = addRoomToUser(id, roomCode);
    if (!success) {
      console.error("Error creating room.");
      return;
    }
    return { roomId: id, roomCode };
  });
};

export const addRoomToUser = async (roomId, roomCode) => {
  const userRef = db.collection("users").doc(userId);
  if (!userRef) {
    console.error(`Couldn't get user with userId ${userId}.`);
    return false;
  }
  const { id } = await userRef.update({
    room: `/room/${roomId}`,
  });
  if (!id) {
    console.error(`Error updating user with userId ${userId}.`);
    return false;
  }
  return true;
};

export const joinRoom = async (roomCode) => {
  const {docs} = await db.collection("rooms")
    .where("code", "==", roomCode)
    .where("active", "==", true)
    .limit(1)
    .get();
  if (docs.length === 0) {
    console.error(`Could not find game ${roomCode}.`);
    return;
  }
  const roomId = docs[0].get("id");
  const success = addRoomToUser(roomId, roomCode);
  if (!success) {
    console.error("Error creating room.");
    return;
  }
  return { roomId, roomCode };
};

const interpretUsers = (docs) => {
  return {
    ok: true,
    result: docs.map(qds => ({
      name: qds.get("name"),
      id: qds.get("id"),
    })),
  };
}

export const getUsers = (roomId) => {
  return db.collection("users")
    .where("room", "==", `/room/${roomId}`)
    .get()
    .then(({ docs }) => interpretUsers(docs));
};

export const subscribeToUsers = (roomId, callback) => {
  return db.collection("users")
    .where("room", "==", `/room/${roomId}`)
    .onSnapshot(
      docs => callback(interpretUsers(docs)),
      error => {
        console.error(`Error adding room listener: ${error}.`)
      });
};

export const subscribeToRoom = (roomId, callback) => {
  return db.collection("rooms").doc(roomId)
    .onSnapshot(doc => {
      const gameId = doc.data().game;
      if (gameId !== undefined) {
        callback(gameId);
      }
    }, error => {
      console.error(`Error adding room listener: ${error}.`)
    });
};

// returns the gameId
// export const joinOrStartGame = (roomId) => {
//   return db.collection("games")
//     .where("room", "==", `/room/${roomId}`)
//     .limit(1)
//     .get()
//     .then(({ empty, docs }) => {
//       if (empty) {
//         return startGame(roomId);
//       }
//       return docs[0].get("id");
//     });
// };

