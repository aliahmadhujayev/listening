/**
 * Authentication Module
 * 7 xonali noyob ID va Bosh harf bilan boshlanadigan ism tizimi.
 */

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    this.currentUser = window.storageManager.getCurrentUser();
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
    // Faqat 7 ta raqam bo'lishi kerak
    const regex = /^\d{7}$/;
    return {
      isValid: regex.test(cleanPhone),
      phone: cleanPhone
    };
  }

  // Kirish yoki Ro'yxatdan o'tish
  async login(rawName, rawPhone) {
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

    return {
      success: true,
      user: user,
      isNewUser: isNewUser,
      message: isNewUser
        ? `Xush kelibsiz, ${user.name}! Siz uchun yangi profil ochildi.`
        : `Xush kelibsiz, ${user.name}! Saqlangan natijalaringiz yuklandi.`
    };
  }

  logout() {
    this.currentUser = null;
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
