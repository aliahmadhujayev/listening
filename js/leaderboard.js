/**
 * Leaderboard (Reyting) Component
 * Barcha foydalanuvchilar natijalari, medallar (🥇 🥈 🥉), saralash va joriy user qatorini ajratish.
 */

class LeaderboardComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  async render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="leaderboard-header">
        <div>
          <h2>🏆 IELTS Listening Reytingi</h2>
          <p class="subtitle">Barcha o'quvchilar orasidagi umumiy natijalar va o'rinlar jadvali</p>
        </div>
        <button id="refreshLeaderboardBtn" class="btn btn-secondary">
          🔄 Yangilash
        </button>
      </div>
      <div id="leaderboardLoading" class="loading-state">Yuklanmoqda...</div>
      <div id="leaderboardTableContainer"></div>
    `;

    document.getElementById("refreshLeaderboardBtn").onclick = () => this.loadData();
    await this.loadData();
  }

  async loadData() {
    const tableContainer = document.getElementById("leaderboardTableContainer");
    const loading = document.getElementById("leaderboardLoading");
    if (loading) loading.style.display = "block";

    let users = await window.storageManager.getAllUsers();
    const currentUser = window.storageManager.getCurrentUser();

    // Reyting bo'yicha tartiblash:
    // 1-kriteriy: Yechilgan mashqlar soni (solvedCount)
    // 2-kriteriy: Jami to'g'ri javoblar soni (totalCorrect)
    // 3-kriteriy: Aniqlik foizi (accuracy)
    users.sort((a, b) => {
      if ((b.solvedCount || 0) !== (a.solvedCount || 0)) {
        return (b.solvedCount || 0) - (a.solvedCount || 0);
      }
      if ((b.totalCorrect || 0) !== (a.totalCorrect || 0)) {
        return (b.totalCorrect || 0) - (a.totalCorrect || 0);
      }
      return (b.accuracy || 0) - (a.accuracy || 0);
    });

    if (loading) loading.style.display = "none";

    if (users.length === 0) {
      tableContainer.innerHTML = `
        <div class="empty-state">
          <p>Hozircha hech kim mashq yechmadi. Birinchi bo'lib boshlang!</p>
        </div>
      `;
      return;
    }

    let rowsHtml = users.map((u, index) => {
      const rank = index + 1;
      let rankBadge = rank;
      let rowClass = "";

      if (rank === 1) rankBadge = `<span class="badge badge-gold">🥇 1</span>`;
      else if (rank === 2) rankBadge = `<span class="badge badge-silver">🥈 2</span>`;
      else if (rank === 3) rankBadge = `<span class="badge badge-bronze">🥉 3</span>`;
      else rankBadge = `<span class="rank-number">${rank}</span>`;

      const isCurrent = currentUser && currentUser.phoneId === u.phoneId;
      if (isCurrent) {
        rowClass = "current-user-row";
      }

      // 7 xonali raqamni chiroyli ko'rsatish
      const phoneDisplay = u.phoneId;

      return `
        <tr class="${rowClass}">
          <td class="text-center font-bold">${rankBadge}</td>
          <td>
            <div class="user-cell">
              <span class="user-avatar-mini">${u.name ? u.name.charAt(0).toUpperCase() : "U"}</span>
              <div>
                <span class="user-name">${u.name || "Noma'lum"}</span>
                ${isCurrent ? `<span class="you-pill">Siz</span>` : ""}
              </div>
            </div>
          </td>
          <td class="font-mono text-muted">ID: ${phoneDisplay}</td>
          <td class="text-center font-bold">${u.solvedCount || 0} / 11</td>
          <td class="text-center text-success font-bold">${u.totalCorrect || 0} ball</td>
          <td class="text-center">
            <div class="accuracy-bar-container">
              <span class="accuracy-text">${u.accuracy || 0}%</span>
              <div class="accuracy-bar">
                <div class="accuracy-fill" style="width: ${u.accuracy || 0}%"></div>
              </div>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    tableContainer.innerHTML = `
      <div class="table-responsive card">
        <table class="styled-table">
          <thead>
            <tr>
              <th class="text-center" style="width: 70px;">O'rni</th>
              <th>Foydalanuvchi</th>
              <th>ID (Raqam)</th>
              <th class="text-center">Mashqlar</th>
              <th class="text-center">To'g'ri javoblar</th>
              <th class="text-center" style="width: 140px;">Aniqlik</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }
}

window.LeaderboardComponent = LeaderboardComponent;
