// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase configuration object - replace with your own Firebase project details
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Add these parameters to help with CORS
  'access_type': 'offline',
  'include_granted_scopes': 'true'
});

// Sign in with Google function
export const signInWithGoogle = async () => {
  try {
    console.log("Starting Google authentication process...");
    
    // Using signInWithPopup with custom error handling
    const result = await signInWithPopup(auth, googleProvider);
    
    // Verify that we have a user with a UID
    if (!result.user || !result.user.uid) {
      console.error("Google auth succeeded but user or UID is missing!", result);
    } else {
      console.log("Google auth successful, UID obtained:", result.user.uid);
    }
    
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    
    // Check for popup blocked errors and provide helpful message
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      console.log("Popup was blocked or closed. Please enable popups for this site.");
    }
    
    // Check for CORS errors
    if (error.message && error.message.includes('cross-origin')) {
      console.log("CORS error detected. This may be due to security settings.");
    }
    
    throw error;
  }
};

export default app;
