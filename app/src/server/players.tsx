import { db } from "./init"
import { wrapError, wrapResult } from "./utils/wrapping";

export type Player = {
  name: string;
  team: number;
  id: number;
  userId: string;
};

export const getPlayers = async (gameId) => {
  const { docs } = await db.collection("players")
    .where("game", "==", `/game/${gameId}`)
    .get();
  if (!docs) {
    return wrapError(`Error getting players for game ${gameId}.`);
  }
  const results = docs.map(async qds => {
    const userRef = qds.get("user");
    if (!userRef) {
      return wrapError(`Error getting user for player with id ${qds.get("id")}`);
    }
    const user = await userRef.get();
    if (!user) {
      return wrapError(`Error getting user with id ${userRef.id}`);
    }
    return {
      name: user.get("name"),
      team: qds.get("team"),
      id: qds.get("id"),
      userId: userRef.id,
    };
  });
  if (results.some(result => result.error !== undefined)) {
    return results.find(result => result.error !== undefined)
  }
  return wrapResult(results);
};
