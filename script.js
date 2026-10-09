import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { auth } from "./firebase.js";

const form = document.querySelector("#login-form");
const card = document.querySelector(".login-card");
const button = document.querySelector("#submit-button");
const googleButton = document.querySelector("#google-button");
const message = document.querySelector("#message");
const initialButtonMarkup = button.innerHTML;

function redirectToPortfolio() {
  button.disabled = true;
  googleButton.disabled = true;
  button.textContent = "Taking you to your portfolio…";
  message.textContent = "One moment";
  card.classList.add("leaving");

  window.setTimeout(() => {
    window.location.assign("https://my-portfolio-9f04.onrender.com/");
  }, 400);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  button.disabled = true;
  message.textContent = "Signing you in…";

  try {
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    await signInWithEmailAndPassword(auth, email, password);
    redirectToPortfolio();
  } catch (error) {
    console.error("Firebase sign-in failed.", error);
    button.disabled = false;
    button.innerHTML = initialButtonMarkup;
    message.textContent = getSignInErrorMessage(error.code);
  }
});

googleButton.addEventListener("click", async () => {
  button.disabled = true;
  googleButton.disabled = true;
  message.textContent = "Connecting to Google…";

  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    redirectToPortfolio();
  } catch (error) {
    console.error("Google sign-in failed.", error);

    if (error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request") {
      message.textContent = "Google sign-in was cancelled.";
    } else {
      message.textContent = getSignInErrorMessage(error.code);
    }

    button.disabled = false;
    googleButton.disabled = false;
  }
});

function getSignInErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "The email or password is incorrect.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled for this project.";
    case "auth/unauthorized-domain":
      return `This domain is not authorized in Firebase. Add "${window.location.hostname}" under Authentication > Settings > Authorized domains.`;
    case "auth/popup-blocked":
      return "Allow pop-ups for this site, then try Google sign-in again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email. Sign in using its original method.";
    default:
      return "Sign-in failed. Please try again.";
  }
}