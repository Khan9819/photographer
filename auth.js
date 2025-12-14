import { 
  auth,
  provider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "./firebase.js";

// --------------------------
// Email Sign Up
// --------------------------
export async function signUpUser(email, password) {
  if (!email || !password) return alert("Please fill all fields.");

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "profile-setup.html"; // new user
  } catch (err) {
    console.error("SignUp error:", err);
    alert(cleanError(err.message));
  }
}

// --------------------------
// Email Sign In
// --------------------------
export async function signInUser(email, password) {
  if (!email || !password) return alert("Please fill all fields.");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html"; // returning user
  } catch (err) {
    console.error("SignIn error:", err);
    alert(cleanError(err.message));
  }
}

// --------------------------
// Google Sign In / Sign Up
// --------------------------
export async function googleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const isNewUser = result._tokenResponse?.isNewUser;

    if (isNewUser) {
      window.location.href = "profile-setup.html"; // new Google user
    } else {
      window.location.href = "dashboard.html"; // returning Google user
    }
  } catch (err) {
    console.error("Google login error:", err);
    alert(cleanError(err.message));
  }
}

// --------------------------
// Reset Password
// --------------------------
export async function resetPassword(email) {
  if (!email) return alert("Enter your email first.");

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent to your email.");
  } catch (err) {
    console.error("Reset password error:", err);
    alert(cleanError(err.message));
  }
}

// --------------------------
// Protect Routes
// --------------------------
export function protectRoute() {
  onAuthStateChanged(auth, user => {
    if (!user) window.location.href = "login.html";
  });
}

// --------------------------
// Logout
// --------------------------
export async function logout() {
  try {
    await signOut(auth);
    window.location.href = "login.html";
  } catch (err) {
    console.error("Logout error:", err);
    alert("Something went wrong while logging out.");
  }
}

// --------------------------
// Clean Firebase error messages
// --------------------------
function cleanError(message) {
  return message
    .replace("Firebase:", "")
    .replace("auth/", "")
    .replace(/\(.*\)\./, "")
    .replace(/[-_]/g, " ")
    .trim();
}
