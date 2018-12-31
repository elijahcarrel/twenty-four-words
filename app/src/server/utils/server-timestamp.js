import * as firebase from 'firebase';
import 'firebase/firestore';

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
