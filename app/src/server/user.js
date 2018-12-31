import { db, userId } from "./init";
import { wrapError, wrapResult } from "./utils/wrapping";

export const saveName = async (name) => {
  const userRef = db.collection("users").doc(userId);
  if (!userRef) {
    return wrapError(`Couldn't get user with userId ${userId}.`);
  }
  const { id } = await userRef.update({
    name,
  });
  if (!id) {
    return wrapError(`Error updating user with userId ${userId}.`);
  }
  return wrapResult({ name });
};
