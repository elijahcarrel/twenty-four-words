import { db } from "./init"

export const getPlayers = (gameId) => {
  return db.collection("users")
    .where("game", "==", `/game/${gameId}`)
    .get()
    .then(({ docs }) => {
      return {
        ok: true,
        result: docs.map(qds => ({
          team: qds.get("team"),
          name: qds.get("name"),
          clientId: qds.get("clientId"),
        })),
      };
    });
};