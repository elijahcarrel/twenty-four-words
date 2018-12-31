import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";

export const initializeRouter = () => {
  admin.initializeApp(functions.config().firebase);
  const db = admin.firestore();
  const app = express();
  const main = express();
  main.use('/api/v1', app);
  const webApi = functions.https.onRequest(main);
  return {app, db, webApi};
};
