import * as firebase from 'firebase';
import 'firebase/firestore';
import * as secrets from './secrets';
import { serverTimestamp } from "./utils/server-timestamp";
import {wrapError, wrapResult} from "./utils/wrapping";

const projectId = "codenames-ec420";
const authDomain = `${projectId}.firebaseapp.com`;
export let db, userId;

export const initDbConnection = () => {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: secrets.FIREBASE_API_KEY,
    authDomain,
    projectId,
    databaseURL: `https://${projectId}.firebaseio.com`,
    storageBucket: `${projectId}.appspot.com`
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore(app);
  
  const settings = {
    timestampsInSnapshots: true,
  };
  db.settings(settings);
  
  const { ok, result } = createUser();
  if (ok) {
    userId = result.userId;
  }
};

export const apiURL = `https://${authDomain}/api/v1`;

export const createUser = async () => {
  const { id } = await db.collection("users").add({
    createTime: serverTimestamp(),
  });
  if (!id) {
    return wrapError("Couldn't create user.");
  }
  return wrapResult({ userId: id });
};