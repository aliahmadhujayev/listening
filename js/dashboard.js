/**
 * Dashboard & Admin Panel Component
 */

class DashboardComponent {
  constructor(containerId, onSelectExercise) {
    this.container = document.getElementById(containerId);
    this.onSelectExercise = onSelectExercise;
    this.isAdminAuthenticated = false;
  }

  // Foydalanuvchi Shaxsiy Paneli
  renderUserDashboard() {
    if (!this.container) return;

    const user = window.authManager.getUser();
    if (!user) {
      this.container.innerHTML = `
        <div class="empty-state card">
          <p>Iltimos, shaxsiy natijalaringizni ko'rish uchun avval login qiling.</p>
        </div>
      `;
      return;
    }

    const units = window.getAllUnits();
    let allExercises = [];
    units.forEach(u => allExercises.push(...u.exercises));
    const totalExercisesCount = allExercises.length;
    const userResults = user.results || {};
    const solvedCount = Object.keys(userResults).length;
    const progressPercent = totalExercisesCount > 0 ? Math.round((solvedCount / totalExercisesCount) * 100) : 0;

    // Mashqlar kartochkalari
    const exCardsHtml = allExercises.map(ex => {
      const res = userResults[ex.id];
      const isCompleted = !!res;

      return `
        <div class="exercise-progress-card ${isCompleted ? "completed" : "pending"}">
          <div class="ex-card-header">
            <span class="ex-badge">${ex.part.split(":")[0]} - Ex ${ex.number}</span>
            <span class="ex-status">${isCompleted ? "✅ Tugatilgan" : "⏳ Qolgan"}</span>
          </div>
          <h4 class="ex-title">${ex.title}</h4>
          ${isCompleted ? `
            <div class="ex-score-info">
              <span class="score-text">Natija: <strong>${res.correct} / ${res.total}</strong> (${res.percent}%)</span>
              <div class="mini-bar"><div class="mini-bar-fill" style="width: ${res.percent}%"></div></div>
            </div>
          ` : `
            <div class="ex-score-info text-muted">
              Hali ishlanmagan
            </div>
          `}
          <button class="btn btn-sm ${isCompleted ? "btn-outline" : "btn-primary"} open-ex-btn" data-ex-id="${ex.id}">
            ${isCompleted ? "Qayta ko'rish" : "Bajarish ▶"}
          </button>
        </div>
      `;
    }).join("");

    this.container.innerHTML = `
      <div class="dashboard-header card">
        <div class="user-greeting">
          <div class="avatar-large">${user.name.charAt(0).toUpperCase()}</div>
          <div>
            <h2>Salom, ${user.name}!</h2>
            <p class="text-muted">ID: <strong>${user.phoneId}</strong> | Shaxsiy o'quvchi kabinetingiz</p>
          </div>
        </div>
        <div class="dashboard-stats-grid">
          <div class="stat-box">
            <div class="stat-number text-primary">${solvedCount} / ${totalExercisesCount}</div>
            <div class="stat-label">Yechilgan mashqlar</div>
          </div>
          <div class="stat-box">
            <div class="stat-number text-success">${progressPercent}%</div>
            <div class="stat-label">Umumiy progress</div>
          </div>
          <div class="stat-box">
            <div class="stat-number text-warning">${user.accuracy || 0}%</div>
            <div class="stat-label">O'rtacha aniqlik</div>
          </div>
          <div class="stat-box">
            <div class="stat-number text-info">${user.totalCorrect || 0}</div>
            <div class="stat-label">To'plangan jami ball</div>
          </div>
        </div>
      </div>

      <div class="section-divider">
        <h3>Mashqlar bo'yicha progress holati</h3>
        <p class="text-muted">Quyidagi kartochkalar orqali yechilgan va qolgan mashqlarni kuzatishingiz mumkin</p>
      </div>

      <div class="exercises-grid">
        ${exCardsHtml}
      </div>
    `;

    // Tugmalarga hodisalarni ulash
    this.container.querySelectorAll(".open-ex-btn").forEach(btn => {
      btn.onclick = () => {
        const exId = btn.getAttribute("data-ex-id");
        if (this.onSelectExercise) this.onSelectExercise(exId);
      };
    });
  }

  // Admin Panel (Parol bilan himoyalangan: admin123)
  renderAdminPanel() {
    if (!this.container) return;

    if (!this.isAdminAuthenticated) {
      this.container.innerHTML = `
        <div class="admin-auth-box card">
          <div class="admin-icon">🔐</div>
          <h2>Admin panelga kirish</h2>
          <p class="text-muted">Boshqaruv paneliga kirish uchun maxfiy parolni kiriting (Standart: <code>admin123</code>)</p>
          
          <div class="form-group">
            <input type="password" id="adminPasswordInput" class="form-control" placeholder="Maxfiy parolni kiriting...">
          </div>
          <div id="adminErrorMsg" class="error-msg" style="display:none;"></div>
          <button id="adminLoginBtn" class="btn btn-primary btn-block">Kirish</button>
        </div>
      `;

      const passInput = document.getElementById("adminPasswordInput");
      const loginBtn = document.getElementById("adminLoginBtn");
      const errorMsg = document.getElementById("adminErrorMsg");

      const attemptLogin = () => {
        if (passInput.value === "admin123") {
          this.isAdminAuthenticated = true;
          this.renderAdminPanel();
        } else {
          errorMsg.style.display = "block";
          errorMsg.textContent = "Noto'g'ri parol! Qayta urinib ko'ring.";
        }
      };

      loginBtn.onclick = attemptLogin;
      passInput.onkeydown = (e) => {
        if (e.key === "Enter") attemptLogin();
      };
      return;
    }

    // Admin autentifikatsiyadan o'tganda
    this.loadAdminView();
  }

  async loadAdminView() {
    this.container.innerHTML = `
      <div class="admin-header card">
        <div>
          <h2>⚙️ Tizim Boshqaruv Paneli (Admin)</h2>
          <p class="text-muted">Foydalanuvchilarni boshqarish, natijalarni tozalash va tahlil qilish</p>
        </div>
        <div class="admin-actions-bar">
          <button id="adminExportJsonBtn" class="btn btn-secondary">📥 JSON Eksport</button>
          <button id="adminLogoutBtn" class="btn btn-outline">Chiqish</button>
        </div>
      </div>

      <div class="card mt-4">
        <h3>Barcha ro'yxatdan o'tgan foydalanuvchilar</h3>
        <div id="adminTableLoading" class="loading-state">Ma'lumotlar yuklanmoqda...</div>
        <div id="adminTableContainer" class="table-responsive mt-3"></div>
      </div>
    `;

    document.getElementById("adminLogoutBtn").onclick = () => {
      this.isAdminAuthenticated = false;
      this.renderAdminPanel();
    };

    document.getElementById("adminExportJsonBtn").onclick = async () => {
      const users = await window.storageManager.getAllUsers();
      const blob = new Blob([JSON.stringify(users, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ielts_users_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
    };

    const users = await window.storageManager.getAllUsers();
    const tableContainer = document.getElementById("adminTableContainer");
    const loading = document.getElementById("adminTableLoading");
    if (loading) loading.style.display = "none";

    if (users.length === 0) {
      tableContainer.innerHTML = "<p class='empty-text'>Hozircha foydalanuvchilar mavjud emas.</p>";
      return;
    }

    const rows = users.map(u => {
      const lastActiveFormatted = u.lastActive ? new Date(u.lastActive).toLocaleString() : "—";
      return `
        <tr>
          <td><strong>${u.name}</strong></td>
          <td class="font-mono">${u.phoneId}</td>
          <td class="text-center">${u.solvedCount || 0} / 11</td>
          <td class="text-center text-success font-bold">${u.totalCorrect || 0}</td>
          <td class="text-center">${u.accuracy || 0}%</td>
          <td class="text-muted text-sm">${lastActiveFormatted}</td>
          <td class="text-center actions-cell">
            <button class="btn btn-xs btn-warning reset-user-btn" data-phone="${u.phoneId}" title="Natijasini tozalash">🔄 Tozalash</button>
            <button class="btn btn-xs btn-danger delete-user-btn" data-phone="${u.phoneId}" title="Butunlay o'chirish">🗑️ O'chirish</button>
          </td>
        </tr>
      `;
    }).join("");

    tableContainer.innerHTML = `
      <table class="styled-table admin-table">
        <thead>
          <tr>
            <th>Foydalanuvchi ismi</th>
            <th>7 xonali ID</th>
            <th class="text-center">Mashqlar</th>
            <th class="text-center">Jami ball</th>
            <th class="text-center">Aniqlik</th>
            <th>Oxirgi faollik</th>
            <th class="text-center">Amallar</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;

    // Amallar hodisalari
    tableContainer.querySelectorAll(".reset-user-btn").forEach(btn => {
      btn.onclick = async () => {
        const phone = btn.getAttribute("data-phone");
        if (confirm(`${phone} ID li foydalanuvchining barcha natijalarini tozalashni xohlaysizmi?`)) {
          await window.storageManager.resetUserResults(phone);
          this.loadAdminView();
        }
      };
    });

    tableContainer.querySelectorAll(".delete-user-btn").forEach(btn => {
      btn.onclick = async () => {
        const phone = btn.getAttribute("data-phone");
        if (confirm(`${phone} ID li foydalanuvchini bazadan butunlay o'chirmoqchimisiz?`)) {
          await window.storageManager.deleteUser(phone);
          this.loadAdminView();
        }
      };
    });
  }
}

window.DashboardComponent = DashboardComponent;
