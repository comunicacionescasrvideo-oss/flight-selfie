import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8LtpBygrISb8CIKsNZgZJyusti28j5rE",
  authDomain: "selfie-campa.firebaseapp.com",
  projectId: "selfie-campa",
  storageBucket: "selfie-campa.firebasestorage.app",
  messagingSenderId: "177103144473",
  appId: "1:177103144473:web:5c0849322ec6a04eb0cc88"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);