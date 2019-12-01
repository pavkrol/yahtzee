import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAaMDWNY74HXdw_uOG4BfIcIlBpwfhoqDU",
  authDomain: "yahtzee-dice-game.firebaseapp.com",
  databaseURL: "https://yahtzee-dice-game.firebaseio.com",
  projectId: "yahtzee-dice-game",
  storageBucket: "yahtzee-dice-game.appspot.com",
  messagingSenderId: "790864843881",
  appId: "1:790864843881:web:9c55c48e7693bb52d33ef8",
  measurementId: "G-GXWMEXNWCG"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

export default firebase;
