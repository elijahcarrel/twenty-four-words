import {db} from "./init"

const generateRoomCode = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getValidRoomCode = () => {
  // TODO(ecarrel): rewrite the database entirely so that it keeps track of all 26^4
  // possible game IDs and then we just order them by last used and pick the one least recently used.
  // If I ever break this then this function might might send infinite requests to firebase...
  const roomCode = generateRoomCode();
  return db.collection("rooms")
    .where("code", "==", roomCode)
    .where("active", "==", true)
    .limit(1)
    .get()
    .then(({ empty }) => {
      // console.log(`Just asked firebase if ${roomCode} was unique and it said: ${empty}.`);
      return empty ? roomCode : getValidRoomCode();
    });
};

export const createRoom = (clientId, name) => {
  return getValidRoomCode().then(roomCode => {
    return db.collection("rooms").add({
      code: roomCode,
      active: true,
    })
      .then(({ id }) => {
        return createUser(id, roomCode, clientId, name);
    });
  });
};

export const createUser = (roomId, roomCode, clientId, name) => {
  return db.collection("users").add({
    clientId,
    name,
    room: `/room/${roomId}`,
  }).then(() => ({
    ok: true,
    result: {
      roomId,
      roomCode,
    },
  }));
};

export const joinRoom = (roomCode, clientId, name) => {
  return db.collection("rooms")
    .where("code", "==", roomCode)
    .where("active", "==", true)
    .limit(1)
    .get()
    .then(({ docs }) => {
      if (docs.length === 0) {
        return {
          ok: false,
          result: { error: `Could not find game ${roomCode}.`},
        };
      }
      const roomId = docs[0].get("id");
      return createUser(roomId, roomCode, clientId, name);
    });
};

export const getUsers = (roomId) => {
  return db.collection("users")
    .where("room", "==", `/room/${roomId}`)
    .get()
    .then(({ docs }) => {
      return {
        ok: true,
        result: docs.map(qds => ({
          name: qds.get("name"),
          clientId: qds.get("clientId"),
        })),
      };
    });
};

export const addRoomListener = (roomId, callback) => {
  return db.collection("rooms").doc(roomId)
    .onSnapshot(doc => {
      const gameId = doc.data().game;
      if (gameId !== undefined) {
        callback(gameId);
      }
    }, error => {
      console.log(`Error adding room listener: ${error}.`)
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

