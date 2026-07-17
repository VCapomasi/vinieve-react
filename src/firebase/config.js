import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8aMJ_0IFmjQMRKHqX-dYUHM2f2PmGBAM",
  authDomain: "vinieve-react.firebaseapp.com",
  projectId: "vinieve-react",
  storageBucket: "vinieve-react.firebasestorage.app",
  messagingSenderId: "417284551286",
  appId: "1:417284551286:web:fdd9c4797d63db19d7e557"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
