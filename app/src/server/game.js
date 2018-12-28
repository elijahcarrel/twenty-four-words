import { db } from "./init"

const generateGameCode = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getValidGameCode = () => {
  const gameCode = generateGameCode();
  return db.collection("games")
    .where("game-id", "==", gameCode)
    .where("game-id-active", "==", true)
    .limit(1)
    .get()
    .then(({ empty }) => {
      // console.log(`Just asked firebase if ${gameCode} was unique and it said: ${empty}.`);
      return empty ? gameCode : getValidGameCode();
    });
};

export const createNewGame = (clientId, name) => {
  // TODO(ecarrel): use Firebase functions to make game IDs expire after a week or two
  // TODO(ecarrel): or rewrite the database entirely so that it keeps track of all 26^4
  // possible game IDs and then we just order them by last used and pick the one least recently used.
  // Lol but for the time being this is totally fine, there's 450,000 options and no way am
  // I going to play close to half of 450,000 games.
  return getValidGameCode().then(gameCode => {
    return db.collection("games").add({
      gameCode,
      gameCodeActive: true,
    })
      .then(({ id }) => {
        return addPlayerToGame(id, gameCode, clientId, name);
    });
  });
};

export const addPlayerToGame = (gameId, gameCode, clientId, name) => {
  return db.collection("users")
    .where("game", "==", `/game/${gameId}`)
    .get()
    .then(({ docs }) => {
      const numTeam0 = docs.filter((qds) => qds.get("team") === 0).length;
      const numTeam1 = docs.filter((qds) => qds.get("team") === 1).length;
      const team = numTeam0 > numTeam1 ? 1 : 0;
      return db.collection("users").add({
        clientId,
        name,
        game: `/game/${gameId}`,
        team,
      }).then(() => ({
        ok: true,
        result: {
          gameId,
          gameCode,
          team,
        },
      }));
    });
};

export const joinGame = (gameCode, clientId, name) => {
  return db.collection("games")
    .where("game-id", "==", gameCode)
    .where("game-id-active", "==", true)
    .limit(1)
    .get()
    .then(({ docs }) => {
      if (docs.length === 0) {
        return {
          ok: false,
          result: { error: `Could not find game ${gameCode}.`},
        };
      }
      return addPlayerToGame(docs[0].get("id"), gameCode, clientId, name);
    });
};