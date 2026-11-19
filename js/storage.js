/**
 * Storage & Database Adapter (LocalStorage + Firebase Firestore)
 * Agar Firebase sozlangan bo'lsa Firestore ga yozadi va o'qiydi,
 * aks holda LocalStorage orqali 100% mustaqil ishlaydi.
 */

const STORAGE_USERS_KEY = "ielts_users_db";
const STORAGE_CURRENT_USER_KEY = "ielts_current_user";

// Namunaviy dastlabki reyting ishtirokchilari (Leaderboard bo'sh ko'rinmasligi uchun)
const DEFAULT_MOCK_USERS = [
  {
    phoneId: "9876543",
    name: "Jasur",
    solvedCount: 11,
    totalCorrect: 82,
    totalQuestions: 90,
    accuracy: 91,
    lastActive: "2026-11-19T21:40:00.000Z",
    results: {}
  },
  {
    phoneId: "8765432",
    name: "Madina",
    solvedCount: 9,
    totalCorrect: 68,
    totalQuestions: 75,
    accuracy: 90,
    lastActive: "2026-11-19T22:15:00.000Z",
    results: {}
  },
  {
    phoneId: "7654321",
    name: "Shaxzod",
    solvedCount: 7,
    totalCorrect: 50,
    totalQuestions: 60,
    accuracy: 83,
    lastActive: "2026-11-19T20:30:00.000Z",
    results: {}
  },
  {
    phoneId: "6543210",
    name: "Malika",
    solvedCount: 5,
    totalCorrect: 38,
    totalQuestions: 45,
    accuracy: 84,
    lastActive: "2026-11-19T19:10:00.000Z",
    results: {}
  }
];

class StorageManager {
  constructor() {
    this.firestore = null;
    this.initDatabase();
  }

  initDatabase() {
    // LocalStorage tekshirish va dastlabki ma'lumotlarni o'rnatish
    if (!localStorage.getItem(STORAGE_USERS_KEY)) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_MOCK_USERS));
    }

    // Firebase faollashtirish (agar config to'g'ri bo'lsa)
    if (window.isFirebaseConfigured && window.isFirebaseConfigured() && window.firebase) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(window.firebaseConfig);
        }
        this.firestore = firebase.firestore();
        console.log("Firebase Firestore muvaffaqiyatli ulandi!");
      } catch (e) {
        console.warn("Firebase ulanishida xatolik, LocalStorage ishlatiladi:", e);
      }
    }
  }

  // Barcha foydalanuvchilarni olish
  async getAllUsers() {
    if (this.firestore) {
      try {
        const snapshot = await this.firestore.collection("users").get();
        const users = [];
        snapshot.forEach(doc => users.push(doc.data()));
        if (users.length > 0) return users;
      } catch (e) {
        console.warn("Firestore o'qishda xatolik:", e);
      }
    }

    // Fallback: LocalStorage
    try {
      const data = localStorage.getItem(STORAGE_USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // 7 xonali ID bo'yicha qidirish
  async getUserByPhone(phoneId) {
    const users = await this.getAllUsers();
    return users.find(u => u.phoneId === String(phoneId)) || null;
  }

  // Foydalanuvchini saqlash yoki yangilash
  async saveUser(user) {
    // 1. LocalStorage ga yozish
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || "[]");
    } catch (e) {
      users = [];
    }

    const index = users.findIndex(u => u.phoneId === user.phoneId);
    if (index >= 0) {
      users[index] = { ...users[index], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    // 2. Agar joriy user bo'lsa, uni ham yangilash
    const current = this.getCurrentUser();
    if (current && current.phoneId === user.phoneId) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify({ ...current, ...user }));
    }

    // 3. Firestore ga yozish
    if (this.firestore) {
      try {
        await this.firestore.collection("users").doc(user.phoneId).set(user, { merge: true });
      } catch (e) {
        console.warn("Firestore saqlashda xato:", e);
      }
    }

    return user;
  }

  // Mashq natijasini saqlash
  async saveExerciseResult(phoneId, exId, scoreData) {
    const user = await this.getUserByPhone(phoneId);
    if (!user) return null;

    if (!user.results) user.results = {};
    user.results[exId] = {
      correct: scoreData.correct,
      total: scoreData.total,
      percent: scoreData.percent,
      userAnswers: scoreData.userAnswers || {},
      completedAt: new Date().toISOString()
    };

    // Statistikalarni qayta hisoblash
    const resKeys = Object.keys(user.results);
    user.solvedCount = resKeys.length;

    let totalCorrect = 0;
    let totalQuestions = 0;
    resKeys.forEach(k => {
      totalCorrect += user.results[k].correct || 0;
      totalQuestions += user.results[k].total || 0;
    });

    user.totalCorrect = totalCorrect;
    user.totalQuestions = totalQuestions;
    user.accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    user.lastActive = new Date().toISOString();

    await this.saveUser(user);
    return user;
  }

  // Foydalanuvchini o'chirish (Admin uchun)
  async deleteUser(phoneId) {
    let users = await this.getAllUsers();
    users = users.filter(u => u.phoneId !== String(phoneId));
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    if (this.firestore) {
      try {
        await this.firestore.collection("users").doc(String(phoneId)).delete();
      } catch (e) {
        console.warn("Firestore o'chirishda xato:", e);
      }
    }

    const current = this.getCurrentUser();
    if (current && current.phoneId === String(phoneId)) {
      this.clearCurrentUser();
    }
  }

  // Foydalanuvchi natijasini tozalash (Admin uchun)
  async resetUserResults(phoneId) {
    const user = await this.getUserByPhone(phoneId);
    if (user) {
      user.results = {};
      user.solvedCount = 0;
      user.totalCorrect = 0;
      user.totalQuestions = 0;
      user.accuracy = 0;
      user.lastActive = new Date().toISOString();
      await this.saveUser(user);
    }
  }

  // Joriy sessiya foydalanuvchisi
  getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
  }

  clearCurrentUser() {
    localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
  }
}

window.storageManager = new StorageManager();
