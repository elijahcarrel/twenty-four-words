import { db } from "./init"

export const getPlayers = (gameId) => {
  return db.collection("players")
    .where("game", "==", `/game/${gameId}`)
    .get()
    .then(({ docs }) => {
      return {
        ok: true,
        result: docs.map(qds => {
          let name = "";
          const userRef = qds.get("user");
          if (userRef) {
            userRef.get()
              .then(res => {
                name = res.data().name;
              })
              .catch(err => console.error("error getting user for player: ", err));
          }
          return {
            name: name,
            team: qds.get("team"),
            clientId: qds.get("clientId"),
          };
        }),
      };
    })
    .catch(err => console.error("error getting players: ", err));
};
