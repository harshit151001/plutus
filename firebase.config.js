import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDvkU_gCQ6n73OoUw094uX09Veor5Xmd4",
  authDomain: "plutus-8c74d.firebaseapp.com",
  projectId: "plutus-8c74d",
  storageBucket: "plutus-8c74d.appspot.com",
  messagingSenderId: "386817189244",
  appId: "1:386817189244:web:f7211fba5274735aa270f9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
