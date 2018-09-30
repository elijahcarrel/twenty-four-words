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
      console.log(`Just asked firebase if ${gameCode} was unique and it said: ${empty}.`);
      if (empty) {
        return gameCode;
      }
      return getValidGameCode();
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
        db.collection("users").add({
          clientId,
          name,
          game: `/game/${id}`,
          team: 0,
        });
        return {
          ok: true,
          result: {
            gameId: id,
            gameCode,
          },
        };
    });
  });
};