# 🎧 Basic IELTS Listening — Interaktiv Veb-Ilova

Ushbu veb-ilova **"Basic IELTS Listening"** kitobi (Unit 1: *Names and Places*) asosida tayyorlangan bo'lib, o'quvchilarga daftarga yozmasdan to'g'ridan-to'g'ri brauzerda audio eshitib mashq bajarish, o'z bilimini tekshirish va umumiy reytingda (Leaderboard) bellashish imkonini beradi.

---

## 🌟 Asosiy Xususiyatlari

1. **Sodda va Qulay Kirish (Login) Tizimi:**
   - **Ism**: Kiritilganda birinchi harfi avtomatik katta harfga o'giriladi (`ali` ➔ `Ali`).
   - **Telefon raqam**: Faqat 7 ta raqam (masalan `1234567`). Operator kodi shart emas.
   - Bu 7 xonali raqam foydalanuvchining noyob ID si bo'lib, avval kirgan bo'lsa barcha natijalari avtomatik tiklanadi; yangi bo'lsa yangi profil yaratiladi.

2. **Interaktiv Audio Pleyer:**
   - Har bir mashq tepasida o'zining MP3 faylini (`audio/01.mp3`, `audio/02.mp3` ...) o'qiydi.
   - Play / Pause, **-5 soniya orqaga**, **+5 soniya oldinga**, vaqt chizig'i (seek slider) va tezlikni o'zgartirish (**0.75x, 1.0x, 1.25x, 1.5x**).

3. **Mashq Turlari va Aqlli Tekshiruv:**
   - Harflar, qisqartmalar (Abbreviations), joy nomlari (Places in Britain), suhbatlar, jadvallar, anketalar va xaritalar.
   - **Check Answers**: To'g'ri javoblar yashil, xatolar qizil bo'lib yonida to'g'ri javob ko'rsatiladi (katta-kichik harflar va bo'sh joylar hisobga olinmaydi).
   - **Reset**: Javoblarni tozalash va qayta ishlash.
   - **Show Script**: Dialoglarning to'liq inglizcha audio matni (tapescript).

4. **Umumiy Reyting (Leaderboard):**
   - 1, 2, 3-o'rinlar maxsus oltin 🥇, kumush 🥈, bronza 🥉 medallar bilan.
   - Eng ko'p mashq yechganlar va eng yuqori aniqlik foiziga ega o'quvchilar tepada turadi.
   - Tizimga kirgan o'quvchining o'z qatori alohida rang va "Siz" yorlig'i bilan ajratib ko'rsatiladi.

5. **Shaxsiy Dashboard & Admin Panel:**
   - **Foydalanuvchi paneli**: Nechta mashq yechilgani, qaysilari qolgani va o'rtacha aniqlik foizi.
   - **Admin panel** (`admin123` maxfiy paroli orqali): Barcha o'quvchilar ro'yxati, istalgan o'quvchini o'chirish yoki ballarini tozalash, JSON formatda yuklab olish.

6. **Modulli Tuzilma:**
   - `js/data/unit1.js` kabi alohida fayllarda joylashgan bo'lib, kelajakda `unit2.js`, `unit3.js` larni osongina qo'shish mumkin.

7. **Dark / Light Mode & To'liq Responsive:**
   - Telefon, planshet va kompyuter ekranlariga to'liq moslashadi.

---

## 🚀 Hostingga Joylashtirish (Deploy)

Ushbu loyiha toza **HTML5 + CSS3 + Vanilla JavaScript** da yaratilgan, shuning uchun hech qanday `npm build` yoki server sozlamalari talab qilinmaydi. Istalgan statik hostingda bir zumda ishlaydi.

### 1-usul: Vercel yoki Netlify orqali (Tavsiya etiladi - 1 daqiqa)
1. [vercel.com](https://vercel.com) yoki [netlify.com](https://netlify.com) saytiga kiring.
2. Papkani shunchaki Drag & Drop (tashlash) qiling yoki GitHub reponi ulang.
3. Saytingiz internetda jonli ishga tushadi!

### 2-usul: GitHub Pages orqali
1. GitHub da yangi ombor (repository) oching va ushbu papkadagi barcha fayllarni yuklang.
2. Repository sozlamalaridan **Settings ➔ Pages** bo'limiga o'ting.
3. Branch: `main` / `root` ni tanlab **Save** tugmasini bosing.

---

## ☁️ Firebase Firestore Integratsiyasi (Bulutli Baza)

Barcha foydalanuvchilarning natijalari va reytingi bir-biriga real vaqtda ko'rinishi uchun Firebase Firestore integratsiyasi tayyorlangan:

1. **[Firebase Console](https://console.firebase.google.com)** ga kiring va Google hisobingiz bilan yangi loyiha yarating.
2. **Build ➔ Firestore Database** bo'limiga o'tib, **Create database** tugmasini bosing (*Start in test mode* ni tanlang).
3. **Project Settings (Tishli g'ildirakcha)** ➔ **General** ➔ **Your apps** bo'limidan Web (`</>`) belgisini bosing.
4. U yerdan `firebaseConfig` parametrlarini ko'chirib oling va loyihadagi `js/firebase-config.js` fayliga qo'ying:

```javascript
window.firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

> **Eslatma:** Agar Firebase kalitlarini hali kiritmagan bo'lsangiz ham, sayt avtomatik **LocalStorage** orqali hech qanday xatoliksiz mukammal ishlayveradi.

---

## 📂 Loyiha Tuzilmasi

```
interaktiv/
├── index.html                   # Asosiy sahifa
├── css/
│   ├── style.css                # Asosiy dizayn va responsive moslashuv
│   └── components.css           # Pleyer, mashqlar, jadval va kartochkalar
├── js/
│   ├── app.js                   # Asosiy dastur logikasi
│   ├── audio-player.js          # Audio pleyer boshqaruvi
│   ├── auth.js                  # Login va 7 xonali ID tekshiruvi
│   ├── leaderboard.js           # Reyting tizimi
│   ├── dashboard.js             # O'quvchi statistikasi va Admin panel
│   ├── storage.js               # LocalStorage + Firestore adapteri
│   ├── firebase-config.js       # Firebase kalitlari
│   └── data/
│       ├── index.js             # Unitlar reestri
│       └── unit1.js             # Unit 1 ning barcha 11 ta mashqi va tapescriptlari
├── audio/                       # 01.mp3 dan 11.mp3 gacha bo'lgan audio fayllar
└── images/                      # Xaritalar (uk_map.svg, world_countries.svg) va avatarlar
```

---

## 🔑 Maxfiy Parollar
- **Admin Panel paroli:** `admin123`
