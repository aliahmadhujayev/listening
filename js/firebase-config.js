/**
 * Firebase Configuration File
 * Loyiha: listening-6e542
 */

window.firebaseConfig = {
  apiKey: "AIzaSyC1dTGlbCdbL7ziHeF-ooctzUgndQO4Gtg",
  authDomain: "listening-6e542.firebaseapp.com",
  projectId: "listening-6e542",
  storageBucket: "listening-6e542.firebasestorage.app",
  messagingSenderId: "682990244075",
  appId: "1:682990244075:web:33235436f04be945ae6eae",
  measurementId: "G-S4E4M9003Q"
};

// Config to'ldirilganligini tekshirish
window.isFirebaseConfigured = function() {
  return window.firebaseConfig &&
         window.firebaseConfig.apiKey &&
         window.firebaseConfig.apiKey !== "YOUR_API_KEY" &&
         window.firebaseConfig.projectId !== "YOUR_PROJECT_ID";
};
