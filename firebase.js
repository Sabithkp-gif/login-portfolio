import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-nyasQznmsR2Xo6qxvHG66pB0XHNeRMs",
  authDomain: "sabith-portfolio-74c30.firebaseapp.com",
  projectId: "sabith-portfolio-74c30",
  storageBucket: "sabith-portfolio-74c30.firebasestorage.app",
  messagingSenderId: "147808029663",
  appId: "1:147808029663:web:ab841ac5ab5c9cac3d926a",
  measurementId: "G-9NHTC67TLQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

isSupported()
  .then((supported) => {
    if (!supported) {
      console.warn("Firebase Analytics is not supported in this browser.");
      return;
    }

    getAnalytics(app);
  })
  .catch((error) => {
    console.error("Firebase Analytics could not be initialized.", error);
  });
