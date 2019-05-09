import firebase from 'firebase';
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: 'tophat-whale.firebaseapp.com',
  databaseURL: 'https://tophat-whale.firebaseio.com',
  projectId: 'tophat-whale',
  storageBucket: 'tophat-whale.appspot.com',
  messagingSenderId: '835660374083',
  appId: '1:835660374083:web:a061c9b1d333872b'
};
firebase.initializeApp(firebaseConfig);
export default firebase;
