/**
 * Authentication Module
 * 7 xonali noyob ID, Bosh harf bilan boshlanadigan ism va Qurilmani eslab qolish (Auto-login) tizimi.
 */

const STORAGE_REMEMBER_DEVICE_KEY = "ielts_device_registered_phone";

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // 1. Dastlabki saqlangan joriy foydalanuvchini olish
    this.currentUser = window.storageManager.getCurrentUser();
  }

  // Qurilma eslab qolinganligini tekshirish va avtomatik profilni tiklash
  async autoLoginIfRemembered() {
    const rememberedPhone = localStorage.getItem(STORAGE_REMEMBER_DEVICE_KEY);
    if (rememberedPhone) {
      const user = await window.storageManager.getUserByPhone(rememberedPhone);
      if (user) {
        this.currentUser = user;
        window.storageManager.setCurrentUser(user);
        return user;
      }
    }
    return this.currentUser;
  }

  // Ism formatlash: Birinchi harfni katta qilish
  static formatName(rawName) {
    if (!rawName) return "";
    const trimmed = rawName.trim();
    if (trimmed.length === 0) return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }

  // 7 xonali raqamni tekshirish
  static validatePhone(phone) {
    const cleanPhone = String(phone).trim();
    const regex = /^\d{7}$/;
    return {
      isValid: regex.test(cleanPhone),
      phone: cleanPhone
    };
  }

  // Kirish yoki Ro'yxatdan o'tish
  async login(rawName, rawPhone, rememberDevice = true) {
    const name = AuthManager.formatName(rawName);
    if (!name) {
      return { success: false, message: "Iltimos, ismingizni kiriting." };
    }

    const phoneCheck = AuthManager.validatePhone(rawPhone);
    if (!phoneCheck.isValid) {
      return {
        success: false,
        message: "Telefon raqami aynan 7 ta raqamdan iborat bo'lishi kerak (Masalan: 1234567). Operator kodi shart emas!"
      };
    }

    const phoneId = phoneCheck.phone;
    let user = await window.storageManager.getUserByPhone(phoneId);

    let isNewUser = false;
    if (user) {
      // Mavjud foydalanuvchi — agar ism o'zgargan bo'lsa yangilab qo'yamiz
      if (name && name !== user.name) {
        user.name = name;
      }
      user.lastActive = new Date().toISOString();
      await window.storageManager.saveUser(user);
    } else {
      // Yangi foydalanuvchi
      isNewUser = true;
      user = {
        phoneId: phoneId,
        name: name,
        solvedCount: 0,
        totalCorrect: 0,
        totalQuestions: 0,
        accuracy: 0,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        results: {}
      };
      await window.storageManager.saveUser(user);
    }

    this.currentUser = user;
    window.storageManager.setCurrentUser(user);

    // Qurilmani doimiy eslab qolish
    if (rememberDevice) {
      localStorage.setItem(STORAGE_REMEMBER_DEVICE_KEY, phoneId);
    }

    return {
      success: true,
      user: user,
      isNewUser: isNewUser,
      message: isNewUser
        ? `Xush kelibsiz, ${user.name}! Profil ochildi va qurilmangiz eslab qolindi.`
        : `Xush kelibsiz, ${user.name}! Natijalaringiz yuklandi va qurilmangiz eslab qolindi.`
    };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_REMEMBER_DEVICE_KEY);
    window.storageManager.clearCurrentUser();
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getUser() {
    return this.currentUser;
  }
}

window.authManager = new AuthManager();
