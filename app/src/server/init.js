import * as firebase from 'firebase';
import 'firebase/firestore';
import * as secrets from './secrets';

// Initialize Firebase
const firebaseConfig = {
  apiKey: secrets.FIREBASE_API_KEY,
  authDomain: "codenames-ec420.firebaseapp.com",
  projectId: "codenames-ec420",
  databaseURL: "https://codenames-ec420.firebaseio.com",
  storageBucket: "codenames-ec420.appspot.com"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(app);

const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);
