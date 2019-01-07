import { db, userId } from "./init";
import { wrapError, wrapResult } from "./utils/wrapping";

export const saveName = async (name) => {
  const userRef = db.collection("users").doc(userId);
  const user = await userRef.get();
  if (!user.exists) {
    return wrapError(`Couldn't get user with userId ${userId}.`);
  }
  await userRef.update({
    name,
  });
  return wrapResult({ name });
};
