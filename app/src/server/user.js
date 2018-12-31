import { db, userId } from "./init";

export const saveName = async (name) => {
  const userRef = db.collection("users").doc(userId);
  if (!userRef) {
    console.error(`Couldn't get user with userId ${userId}.`);
    return false;
  }
  const { id } = await userRef.update({
    name,
  });
  if (!id) {
    console.error(`Error updating user with userId ${userId}.`);
    return false;
  }
  return true;
};
