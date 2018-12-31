import { db } from "./init"

export const getPlayers = async (gameId) => {
  const { docs } = await db.collection("players")
    .where("game", "==", `/game/${gameId}`)
    .get();
  if (!docs) {
    console.error(`Error getting players for game ${gameId}.`);
    return;
  }
  return docs.map(async qds => {
    const userRef = qds.get("user");
    if (!userRef) {
      console.error(`Error getting user for player with id ${qds.get("id")}`);
      return;
    }
    const user = await userRef.get();
    if (!user) {
      console.error(`Error getting user with id ${userRef.id}`);
      return;
    }
    const name = user.data().name;
    return {
      name,
      team: qds.get("team"),
      id: qds.get("id"),
      userId: userRef.id,
    };
  });
};
