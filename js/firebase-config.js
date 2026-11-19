/**
 * Firebase Configuration File
 * =====================================================================
 * Agar siz natijalar barcha qurilmalar va foydalanuvchilar o'rtasida
 * umumiy bulutda saqlanishini va reyting barchaga ko'rinishini istasangiz:
 * 
 * 1. https://console.firebase.google.com saytiga kiring.
 * 2. "Add project" (Loyiha yaratish) tugmasini bosing.
 * 3. Loyiha ichida "Build" -> "Firestore Database" bo'limiga o'tib, "Create database" qiling (Test mode tanlang).
 * 4. "Project Settings" (Sozlamalar tishi) -> "General" -> "Your apps" bo'limidan Web (</>) belgisini bosing.
 * 5. Chiqqan konfiguratsiya qiymatlarini quyidagi firebaseConfig obyektiga qo'ying.
 * =====================================================================
 */

window.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Config to'ldirilganligini avtomatik aniqlash
window.isFirebaseConfigured = function() {
  return window.firebaseConfig &&
         window.firebaseConfig.apiKey &&
         window.firebaseConfig.apiKey !== "YOUR_API_KEY" &&
         window.firebaseConfig.projectId !== "YOUR_PROJECT_ID";
};
