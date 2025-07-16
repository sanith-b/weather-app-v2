import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app: any;
let auth: any;
let db: any;
let uid: string | null = null;

export function firebaseInit() {
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth();
    db = getFirestore();
    signInAnonymously(auth).then((userCred) => {
      uid = userCred.user.uid;
    });
  }
}

export async function getUserPrefs() {
  if (!db || !uid) return null;
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function saveUserPrefs(prefs: any) {
  if (!db || !uid) return;
  await setDoc(doc(db, "users", uid), prefs, { merge: true });
}