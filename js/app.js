/**
 * Main Application Controller
 */

class App {
  constructor() {
    this.currentView = "exercise"; // "exercise" | "leaderboard" | "dashboard" | "admin"
    this.currentUnit = null;
    this.currentExercise = null;
    this.audioPlayer = null;
    this.leaderboard = null;
    this.dashboard = null;
    this.theme = localStorage.getItem("ielts_theme") || "light";

    this.init();
  }

  async init() {
    this.applyTheme(this.theme);

    // Audio Player va Komponentlarni initsializatsiya qilish
    this.audioPlayer = new AudioPlayerComponent("audioPlayerContainer");
    this.leaderboard = new LeaderboardComponent("leaderboardView");
    this.dashboard = new DashboardComponent("dashboardView", (exId) => {
      this.openExerciseById(exId);
    });

    this.bindGlobalEvents();
    this.renderSidebarExercises();

    // Qurilma eslab qolinganligini tekshirish (Auto-login)
    await window.authManager.autoLoginIfRemembered();

    // Foydalanuvchi kirmagan bo'lsa login modalini ochish
    if (!window.authManager.isLoggedIn()) {
      this.showLoginModal();
    } else {
      this.updateUserUI();
    }

    // Dastlabki mashqni ochish
    const units = window.getAllUnits();
    if (units.length > 0 && units[0].exercises.length > 0) {
      this.loadExercise(units[0], units[0].exercises[0]);
    }
  }

  // Mavzuni o'zgartirish (Dark / Light)
  applyTheme(theme) {
    this.theme = theme;
    localStorage.setItem("ielts_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
  }

  toggleTheme() {
    this.applyTheme(this.theme === "dark" ? "light" : "dark");
  }

  // Foydalanuvchi profilini Sidebar va Headeda ko'rsatish
  updateUserUI() {
    const user = window.authManager.getUser();
    const userCard = document.getElementById("sidebarUserCard");
    const loginPrompt = document.getElementById("sidebarLoginPrompt");

    if (user) {
      if (userCard) userCard.style.display = "flex";
      if (loginPrompt) loginPrompt.style.display = "none";

      const nameEl = document.getElementById("sidebarUserName");
      const idEl = document.getElementById("sidebarUserId");
      const scoreEl = document.getElementById("sidebarUserScore");

      const totalExCount = window.getAllUnits().reduce((sum, un) => sum + un.exercises.length, 0);
      if (nameEl) nameEl.textContent = user.name;
      if (idEl) idEl.textContent = `ID: ${user.phoneId}`;
      if (scoreEl) scoreEl.textContent = `${user.solvedCount || 0}/${totalExCount} mashq (${user.accuracy || 0}%)`;
    } else {
      if (userCard) userCard.style.display = "none";
      if (loginPrompt) loginPrompt.style.display = "block";
    }
  }

  // Sidebar mashqlar ro'yxatini chiqarish
  renderSidebarExercises() {
    const container = document.getElementById("sidebarExerciseList");
    if (!container) return;

    const units = window.getAllUnits();
    let html = "";

    units.forEach(unit => {
      html += `
        <div class="unit-group">
          <div class="unit-title-toggle active">
            <span>📚 ${unit.title}</span>
            <span class="arrow">▼</span>
          </div>
          <div class="exercise-items-list">
      `;

      unit.exercises.forEach(ex => {
        const isActive = this.currentExercise && this.currentExercise.id === ex.id;
        html += `
          <a href="javascript:void(0)" class="exercise-nav-item ${isActive ? "active" : ""}" data-unit-id="${unit.id}" data-ex-id="${ex.id}">
            <span class="ex-nav-num">Ex ${ex.number}</span>
            <span class="ex-nav-name">${ex.title.replace(/^Exercise \d+:\s*/, "")}</span>
          </a>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Unit sarlavhasini bosganda ochish/yopish (Accordion)
    container.querySelectorAll(".unit-title-toggle").forEach(toggle => {
      toggle.onclick = () => {
        const list = toggle.nextElementSibling;
        const arrow = toggle.querySelector(".arrow");
        if (list) {
          const isHidden = list.style.display === "none";
          list.style.display = isHidden ? "block" : "none";
          if (arrow) arrow.textContent = isHidden ? "▼" : "▶";
        }
      };
    });

    // Mashqlarga click hodisasini ulash
    container.querySelectorAll(".exercise-nav-item").forEach(item => {
      item.onclick = () => {
        const unitId = item.getAttribute("data-unit-id");
        const exId = item.getAttribute("data-ex-id");
        const found = window.findExerciseById(exId);
        if (found) {
          this.loadExercise(found.unit, found.exercise);
          this.switchView("exercise");
          // Mobil qurilmalarda sidebarni yopish
          this.closeSidebarOnMobile();
        }
      };
    });
  }

  openExerciseById(exId) {
    const found = window.findExerciseById(exId);
    if (found) {
      this.loadExercise(found.unit, found.exercise);
      this.switchView("exercise");
    }
  }

  // Mashqni yuklash
  loadExercise(unit, exercise) {
    this.currentUnit = unit;
    this.currentExercise = exercise;

    // Sidebar active holatini yangilash
    document.querySelectorAll(".exercise-nav-item").forEach(item => {
      if (item.getAttribute("data-ex-id") === exercise.id) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Audio pleyerni yangilash
    if (this.audioPlayer) {
      this.audioPlayer.setTrack(exercise.audio, `${unit.title} — ${exercise.title}`);
    }

    // Top Header sarlavhasini yangilash
    const headerTitle = document.getElementById("topHeaderTitle");
    const headerBadge = document.getElementById("topHeaderBadge");
    if (headerTitle) headerTitle.textContent = `${unit.title} — ${exercise.title}`;
    if (headerBadge) headerBadge.textContent = `${unit.title.split(":")[0]}: Ex ${exercise.number}`;

    // Mashq kontentini chizish
    this.renderExerciseContent(exercise);
  }

  // Mashq maydonlarini chizish
  renderExerciseContent(ex) {
    const container = document.getElementById("exerciseWorkArea");
    if (!container) return;

    let contentHtml = "";

    // 1. Agar rasm bo'lsa (Xarita yoki sxema)
    if (ex.image) {
      contentHtml += `
        <div class="exercise-media-box">
          <img src="${ex.image}" alt="${ex.imageAlt || "Exercise Illustration"}" class="exercise-image" />
        </div>
      `;
    }

    // 2. Agar maxsus bo'limlar bo'lsa (Exercise 1: Section A, B, C kabi)
    if (ex.sections) {
      ex.sections.forEach(sec => {
        contentHtml += `<div class="exercise-sub-section card">`;
        contentHtml += `<h3>${sec.title}</h3>`;

        if (sec.type === "reference") {
          contentHtml += `
            <div class="alphabet-reference-box">
              <div class="alpha-row"><strong>Capital letters:</strong> ${sec.content.capital}</div>
              <div class="alpha-row"><strong>Small letters:</strong> ${sec.content.small}</div>
            </div>
          `;
        } else if (sec.type === "fill_grid") {
          contentHtml += `<div class="letters-grid">`;
          sec.items.forEach(it => {
            contentHtml += `
              <div class="letter-input-box" data-id="${it.id}">
                <span class="label">${it.label}</span>
                <input type="text" class="form-control char-input answer-input" data-id="${it.id}" maxlength="3" autocomplete="off" />
                <span class="feedback-badge" data-feedback-for="${it.id}"></span>
              </div>
            `;
          });
          contentHtml += `</div>`;
        } else if (sec.type === "choice_grid") {
          contentHtml += `<div class="choice-rows-container">`;
          sec.rows.forEach(r => {
            contentHtml += `
              <div class="choice-row" data-id="${r.id}">
                <span class="row-label">${r.label}:</span>
                <div class="choice-options">
                  ${r.options.map(opt => `
                    <button type="button" class="btn-choice-letter" data-row-id="${r.id}" data-val="${opt}">${opt}</button>
                  `).join("")}
                </div>
                <span class="feedback-badge" data-feedback-for="${r.id}"></span>
              </div>
            `;
          });
          contentHtml += `</div>`;
        }

        contentHtml += `</div>`;
      });
    }

    // 3. Oddiy qisqartmalar / joy nomlari ro'yxati (Exercise 2, Exercise 3)
    if (ex.items && !ex.sections) {
      if (ex.items[0].question || ex.items[0].text) {
        // Savol-javob yoki jumlalar
        contentHtml += `<div class="questions-list card">`;
        ex.items.forEach(it => {
          let text = it.question || it.text;
          const inputFieldHtml = `
            <span class="inline-input-wrapper">
              <input type="text" class="form-control inline-input answer-input" data-id="${it.id}" placeholder="..." autocomplete="off" />
              <span class="feedback-badge" data-feedback-for="${it.id}"></span>
            </span>
          `;
          const renderedText = text.replace("[blank]", inputFieldHtml);
          contentHtml += `<div class="question-row" data-id="${it.id}">${renderedText}</div>`;
        });
        contentHtml += `</div>`;
      } else {
        // 2 ustunli ro'yxat (masalan: 1. ___ 2. ___)
        contentHtml += `<div class="items-grid card">`;
        ex.items.forEach(it => {
          contentHtml += `
            <div class="item-input-row" data-id="${it.id}">
              <span class="item-num">${it.label}</span>
              <input type="text" class="form-control answer-input" data-id="${it.id}" placeholder="Javobingiz..." autocomplete="off" />
              <span class="feedback-badge" data-feedback-for="${it.id}"></span>
            </div>
          `;
        });
        contentHtml += `</div>`;
      }
    }

    // 4. Jadvallar (Exercise 3, 5, 8)
    if (ex.table) {
      contentHtml += `
        <div class="table-responsive card">
          <table class="styled-table table-inputs">
            <thead>
              <tr>
                ${ex.table.headers.map(h => `<th>${h}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${ex.table.rows.map(row => {
                if (row.isExample) {
                  return `
                    <tr class="example-row">
                      <td><strong>${row.name}</strong></td>
                      <td>${row.from}</td>
                      <td>${row.subject}</td>
                    </tr>
                  `;
                }

                return `
                  <tr>
                    <td><strong>${row.name}</strong></td>
                    <td>
                      ${row.country ? `
                        <input type="text" class="form-control answer-input" data-id="${row.country.id}" placeholder="Davlat..." autocomplete="off" />
                        <span class="feedback-badge" data-feedback-for="${row.country.id}"></span>
                      ` : `
                        <input type="text" class="form-control answer-input" data-id="${row.from.id}" placeholder="Qayerdan..." autocomplete="off" />
                        <span class="feedback-badge" data-feedback-for="${row.from.id}"></span>
                      `}
                    </td>
                    <td>
                      <input type="text" class="form-control answer-input" data-id="${row.subject.id}" placeholder="Soha..." autocomplete="off" />
                      <span class="feedback-badge" data-feedback-for="${row.subject.id}"></span>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    // 5. Shaxs anketalari / Kartochkalar (Exercise 4: Introducing yourself)
    if (ex.cards) {
      contentHtml += `<div class="person-cards-grid">`;
      ex.cards.forEach(card => {
        contentHtml += `
          <div class="person-card card">
            <div class="person-header">
              <img src="${card.avatar}" alt="${card.name}" class="person-avatar" />
              <h4>${card.person}. ${card.name}</h4>
            </div>
            <div class="person-fields">
              ${card.fields.map(f => `
                <div class="person-field-row" data-id="${f.id}">
                  <label class="field-label">${f.label}:</label>
                  <input type="text" class="form-control answer-input" data-id="${f.id}" placeholder="..." autocomplete="off" />
                  <span class="feedback-badge" data-feedback-for="${f.id}"></span>
                </div>
              `).join("")}
            </div>
          </div>
        `;
      });
      contentHtml += `</div>`;
    }

    // 6. Formalar (Exercise 6, Exercise 7 Task B)
    if (ex.forms) {
      contentHtml += `<div class="forms-grid">`;
      ex.forms.forEach(form => {
        contentHtml += `
          <div class="form-card card">
            <h4 class="form-card-title">${form.title}</h4>
            <div class="form-card-fields">
              ${form.items.map(it => {
                if (it.isFixed) {
                  return `
                    <div class="form-field-row fixed-field">
                      <label>${it.label}:</label>
                      <span class="fixed-val">${it.value}</span>
                    </div>
                  `;
                }
                return `
                  <div class="form-field-row" data-id="${it.id}">
                    <label>${it.label}:</label>
                    <input type="text" class="form-control answer-input" data-id="${it.id}" placeholder="..." autocomplete="off" />
                    <span class="feedback-badge" data-feedback-for="${it.id}"></span>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        `;
      });
      contentHtml += `</div>`;
    }

    // Oldingi va Keyingi mashqlarni aniqlash
    const allUnits = window.getAllUnits();
    let allExercises = [];
    allUnits.forEach(u => allExercises.push(...u.exercises));
    const currentIndex = allExercises.findIndex(e => e.id === ex.id);
    const prevEx = currentIndex > 0 ? allExercises[currentIndex - 1] : null;
    const nextEx = currentIndex < allExercises.length - 1 ? allExercises[currentIndex + 1] : null;

    // Asosiy Exercise header va footer tugmalari
    container.innerHTML = `
      <div class="exercise-header card">
        <div class="ex-header-top-row">
          <div class="ex-meta">
            <span class="part-tag">${ex.part}</span>
            <span class="num-tag">Exercise ${ex.number}</span>
          </div>
          <div class="ex-top-nav-buttons">
            ${prevEx ? `
              <button class="btn btn-outline btn-sm nav-jump-btn" data-target-id="${prevEx.id}">
                ⬅ Oldingi
              </button>
            ` : ""}
            ${nextEx ? `
              <button class="btn btn-primary btn-sm nav-jump-btn font-bold" data-target-id="${nextEx.id}">
                Keyingi mashq (Ex ${nextEx.number}) ➔
              </button>
            ` : `
              <button class="btn btn-warning btn-sm nav-finish-btn font-bold">
                🏆 Reyting ➔
              </button>
            `}
          </div>
        </div>
        <h1 class="exercise-main-title">${ex.title}</h1>
        <p class="instruction-text">${ex.instruction}</p>
        ${ex.hint ? `<p class="hint-text">💡 ${ex.hint}</p>` : ""}
      </div>

      <div class="exercise-body">
        ${contentHtml}
      </div>

      <div class="exercise-action-bar card">
        <div class="action-buttons-group">
          ${prevEx ? `
            <button id="prevExerciseBtn" class="btn btn-outline btn-lg" data-target-id="${prevEx.id}">
              ⬅ Oldingi (Ex ${prevEx.number})
            </button>
          ` : ""}
          <button id="checkAnswersBtn" class="btn btn-success btn-lg">
            ✓ Check Answers
          </button>
          <button id="resetExerciseBtn" class="btn btn-outline btn-lg">
            🔄 Reset
          </button>
          <button id="toggleScriptBtn" class="btn btn-secondary btn-lg">
            📜 Show Script
          </button>
          ${nextEx ? `
            <button id="nextExerciseBtn" class="btn btn-primary btn-lg" data-target-id="${nextEx.id}">
              Keyingi mashq (Ex ${nextEx.number}) ➔
            </button>
          ` : `
            <button id="finishAllBtn" class="btn btn-warning btn-lg">
              🏆 Reytingni ko'rish
            </button>
          `}
        </div>

        <div id="exerciseResultSummary" class="exercise-result-summary" style="display:none;"></div>
      </div>

      <div id="exerciseScriptModal" class="card script-accordion" style="display:none;">
        <div class="script-header">
          <h3>🎙️ Audio Tapescript (Matn)</h3>
          <button id="closeScriptBtn" class="btn-icon">✕</button>
        </div>
        <pre class="script-content">${ex.script}</pre>
      </div>
    `;

    // Avvalgi saqlangan javoblarni tiklash
    this.restoreUserAnswersForCurrentExercise();

    // Eventlarni bog'lash
    this.bindExerciseEvents();
  }

  // Variant tanlash tugmalari va input eventlari
  bindExerciseEvents() {
    const container = document.getElementById("exerciseWorkArea");
    if (!container) return;

    // Harflarni tanlash tugmalari (Choice grid)
    container.querySelectorAll(".btn-choice-letter").forEach(btn => {
      btn.onclick = () => {
        const rowId = btn.getAttribute("data-row-id");
        container.querySelectorAll(`.btn-choice-letter[data-row-id="${rowId}"]`).forEach(b => {
          b.classList.remove("selected");
        });
        btn.classList.add("selected");
      };
    });

    // Yuqori panel Navigatsiya tugmalari
    container.querySelectorAll(".nav-jump-btn").forEach(btn => {
      btn.onclick = () => {
        this.saveAnswersSilently();
        const targetId = btn.getAttribute("data-target-id");
        if (targetId) {
          this.openExerciseById(targetId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      };
    });

    container.querySelectorAll(".nav-finish-btn").forEach(btn => {
      btn.onclick = () => {
        this.saveAnswersSilently();
        this.switchView("leaderboard");
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    });

    // Prev / Next navigatsiya tugmalari
    const prevBtn = document.getElementById("prevExerciseBtn");
    if (prevBtn) {
      prevBtn.onclick = () => {
        this.saveAnswersSilently();
        const targetId = prevBtn.getAttribute("data-target-id");
        if (targetId) {
          this.openExerciseById(targetId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      };
    }

    const nextBtn = document.getElementById("nextExerciseBtn");
    if (nextBtn) {
      nextBtn.onclick = () => {
        this.saveAnswersSilently();
        const targetId = nextBtn.getAttribute("data-target-id");
        if (targetId) {
          this.openExerciseById(targetId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      };
    }

    const finishBtn = document.getElementById("finishAllBtn");
    if (finishBtn) {
      finishBtn.onclick = () => {
        this.saveAnswersSilently();
        this.switchView("leaderboard");
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    }

    // Check Answers
    const checkBtn = document.getElementById("checkAnswersBtn");
    if (checkBtn) checkBtn.onclick = () => this.checkAnswers();

    // Reset
    const resetBtn = document.getElementById("resetExerciseBtn");
    if (resetBtn) resetBtn.onclick = () => this.resetExercise();

    // Show / Hide Script
    const scriptBtn = document.getElementById("toggleScriptBtn");
    const scriptModal = document.getElementById("exerciseScriptModal");
    const closeScriptBtn = document.getElementById("closeScriptBtn");

    if (scriptBtn && scriptModal) {
      scriptBtn.onclick = () => {
        const isHidden = scriptModal.style.display === "none";
        scriptModal.style.display = isHidden ? "block" : "none";
        scriptBtn.textContent = isHidden ? "📜 Hide Script" : "📜 Show Script";
      };
    }

    if (closeScriptBtn && scriptModal) {
      closeScriptBtn.onclick = () => {
        scriptModal.style.display = "none";
        if (scriptBtn) scriptBtn.textContent = "📜 Show Script";
      };
    }
  }

  // Javoblarni tekshirish (Check Answers)
  async checkAnswers() {
    const ex = this.currentExercise;
    if (!ex) return;

    let totalQuestions = 0;
    let correctCount = 0;
    const userAnswers = {};

    // Yordamchi tozalovchi funksiya: Katta/kichik harf, bo'sh joylar va tinish belgilarini normallashtirish
    const normalize = (str) => {
      if (!str) return "";
      return String(str)
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    // Javob to'g'riligini solishtirish
    const isAnswerCorrect = (userVal, correctList) => {
      const uNorm = normalize(userVal);
      if (!uNorm) return false;
      return correctList.some(ans => {
        const cNorm = normalize(ans);
        return uNorm === cNorm || uNorm.includes(cNorm) || cNorm.includes(uNorm);
      });
    };

    // 1. Matnli inputlar (Answer inputs)
    const inputs = document.querySelectorAll("#exerciseWorkArea .answer-input");
    inputs.forEach(input => {
      const inputId = input.getAttribute("data-id");
      const userVal = input.value.trim();
      userAnswers[inputId] = userVal;

      // Bu input uchun to'g'ri javobni qidiramiz
      let targetItem = null;

      // Section items
      if (ex.sections) {
        for (const s of ex.sections) {
          if (s.items) {
            const found = s.items.find(it => it.id === inputId);
            if (found) { targetItem = found; break; }
          }
        }
      }

      // Root items
      if (!targetItem && ex.items) {
        targetItem = ex.items.find(it => it.id === inputId);
      }

      // Table items
      if (!targetItem && ex.table) {
        for (const r of ex.table.rows) {
          if (r.country && r.country.id === inputId) targetItem = r.country;
          if (r.from && r.from.id === inputId) targetItem = r.from;
          if (r.subject && r.subject.id === inputId) targetItem = r.subject;
        }
      }

      // Card items
      if (!targetItem && ex.cards) {
        for (const c of ex.cards) {
          const found = c.fields.find(f => f.id === inputId);
          if (found) { targetItem = found; break; }
        }
      }

      // Form items
      if (!targetItem && ex.forms) {
        for (const f of ex.forms) {
          const found = f.items.find(it => it.id === inputId);
          if (found) { targetItem = found; break; }
        }
      }

      if (targetItem && targetItem.answer) {
        totalQuestions++;
        const isCorrect = isAnswerCorrect(userVal, targetItem.answer);
        const badge = document.querySelector(`[data-feedback-for="${inputId}"]`);

        if (isCorrect) {
          correctCount++;
          input.classList.remove("is-wrong");
          input.classList.add("is-correct");
          if (badge) {
            badge.className = "feedback-badge correct";
            badge.textContent = "✓";
          }
        } else {
          input.classList.remove("is-correct");
          input.classList.add("is-wrong");
          if (badge) {
            badge.className = "feedback-badge wrong";
            badge.textContent = `✗ (${targetItem.displayAnswer || targetItem.answer[0]})`;
          }
        }
      }
    });

    // 2. Choice grid (Exercise 1 Section C)
    if (ex.sections) {
      ex.sections.forEach(sec => {
        if (sec.type === "choice_grid") {
          sec.rows.forEach(r => {
            totalQuestions++;
            const selectedBtn = document.querySelector(`.btn-choice-letter[data-row-id="${r.id}"].selected`);
            const userVal = selectedBtn ? selectedBtn.getAttribute("data-val") : "";
            userAnswers[r.id] = userVal;
            const badge = document.querySelector(`[data-feedback-for="${r.id}"]`);

            if (userVal === r.answer) {
              correctCount++;
              if (selectedBtn) selectedBtn.classList.add("btn-choice-correct");
              if (badge) {
                badge.className = "feedback-badge correct";
                badge.textContent = `✓ To'g'ri (${r.answer})`;
              }
            } else {
              if (selectedBtn) selectedBtn.classList.add("btn-choice-wrong");
              // To'g'ri variantni yashil bilan ko'rsatamiz
              const correctBtn = document.querySelector(`.btn-choice-letter[data-row-id="${r.id}"][data-val="${r.answer}"]`);
              if (correctBtn) correctBtn.classList.add("btn-choice-correct");
              if (badge) {
                badge.className = "feedback-badge wrong";
                badge.textContent = `✗ (To'g'ri: ${r.answer})`;
              }
            }
          });
        }
      });
    }

    const percent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Natija xulosasini ko'rsatish
    const summaryBox = document.getElementById("exerciseResultSummary");
    if (summaryBox) {
      summaryBox.style.display = "block";

      const allUnits = window.getAllUnits();
      let allExercises = [];
      allUnits.forEach(u => allExercises.push(...u.exercises));
      const currentIndex = allExercises.findIndex(e => e.id === ex.id);
      const nextEx = currentIndex < allExercises.length - 1 ? allExercises[currentIndex + 1] : null;

      summaryBox.innerHTML = `
        <div class="result-box-wrapper">
          <div class="result-badge ${percent >= 70 ? "badge-success" : "badge-warning"}">
            Natijangiz: <strong>${correctCount} / ${totalQuestions}</strong> (${percent}%)
          </div>
          ${nextEx ? `
            <button id="summaryNextBtn" class="btn btn-primary btn-lg" data-target-id="${nextEx.id}">
              Keyingi mashqqa o'tish (Ex ${nextEx.number}) ➔
            </button>
          ` : `
            <button id="summaryLeaderboardBtn" class="btn btn-warning btn-lg">
              🏆 Barcha mashqlar tugadi! Reytingni ko'rish ➔
            </button>
          `}
        </div>
      `;

      const summaryNextBtn = document.getElementById("summaryNextBtn");
      if (summaryNextBtn) {
        summaryNextBtn.onclick = () => {
          this.openExerciseById(summaryNextBtn.getAttribute("data-target-id"));
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }
      const summaryLdBtn = document.getElementById("summaryLeaderboardBtn");
      if (summaryLdBtn) {
        summaryLdBtn.onclick = () => {
          this.switchView("leaderboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        };
      }
    }

    // Agar tizimga kirgan bo'lsa, natijani saqlaymiz!
    const user = window.authManager.getUser();
    if (user) {
      await window.storageManager.saveExerciseResult(user.phoneId, ex.id, {
        correct: correctCount,
        total: totalQuestions,
        percent: percent,
        userAnswers: userAnswers
      });
      // Sidebar va foydalanuvchi ma'lumotlarini yangilash
      this.updateUserUI();
    }
  }

  // Javoblarni jimgina (tekshiruv ranglarini chiqarmasdan) saqlash
  saveAnswersSilently() {
    const ex = this.currentExercise;
    const user = window.authManager.getUser();
    if (!ex || !user) return;

    const userAnswers = {};
    const inputs = document.querySelectorAll("#exerciseWorkArea .answer-input");
    inputs.forEach(input => {
      const inputId = input.getAttribute("data-id");
      const userVal = input.value.trim();
      if (userVal) userAnswers[inputId] = userVal;
    });

    // Harf tanlash
    document.querySelectorAll("#exerciseWorkArea .btn-choice-letter.selected").forEach(btn => {
      const rowId = btn.getAttribute("data-row-id");
      const val = btn.getAttribute("data-val");
      if (rowId && val) userAnswers[rowId] = val;
    });

    if (Object.keys(userAnswers).length > 0) {
      if (!user.results) user.results = {};
      if (!user.results[ex.id]) {
        user.results[ex.id] = {
          correct: 0,
          total: 0,
          percent: 0,
          userAnswers: userAnswers,
          completedAt: new Date().toISOString()
        };
      } else {
        user.results[ex.id].userAnswers = {
          ...user.results[ex.id].userAnswers,
          ...userAnswers
        };
      }
      window.storageManager.saveUser(user);
    }
  }

  // Qayta ishlash (Reset)
  resetExercise() {
    const container = document.getElementById("exerciseWorkArea");
    if (!container) return;

    container.querySelectorAll(".answer-input").forEach(input => {
      input.value = "";
      input.classList.remove("is-correct", "is-wrong");
    });

    container.querySelectorAll(".btn-choice-letter").forEach(btn => {
      btn.classList.remove("selected", "btn-choice-correct", "btn-choice-wrong");
    });

    container.querySelectorAll(".feedback-badge").forEach(b => {
      b.textContent = "";
      b.className = "feedback-badge";
    });

    const summaryBox = document.getElementById("exerciseResultSummary");
    if (summaryBox) summaryBox.style.display = "none";
  }

  // Oldingi saqlangan javoblarni yuklash
  restoreUserAnswersForCurrentExercise() {
    const user = window.authManager.getUser();
    if (!user || !user.results || !this.currentExercise) return;

    const saved = user.results[this.currentExercise.id];
    if (!saved || !saved.userAnswers) return;

    Object.keys(saved.userAnswers).forEach(inputId => {
      const val = saved.userAnswers[inputId];
      const input = document.querySelector(`.answer-input[data-id="${inputId}"]`);
      if (input) input.value = val;

      const choiceBtn = document.querySelector(`.btn-choice-letter[data-row-id="${inputId}"][data-val="${val}"]`);
      if (choiceBtn) choiceBtn.classList.add("selected");
    });
  }

  // Ko'rinishlarni almashtirish
  switchView(viewName) {
    this.currentView = viewName;

    // View konteynerlarini boshqarish
    const views = {
      exercise: document.getElementById("exerciseView"),
      leaderboard: document.getElementById("leaderboardView"),
      dashboard: document.getElementById("dashboardView")
    };

    Object.keys(views).forEach(key => {
      if (views[key]) {
        views[key].style.display = key === viewName ? "block" : "none";
      }
    });

    // Menyu tugmalarining faol holati
    document.querySelectorAll(".main-nav-link").forEach(link => {
      if (link.getAttribute("data-view") === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (viewName === "leaderboard") {
      this.leaderboard.render();
    } else if (viewName === "dashboard") {
      this.dashboard.renderUserDashboard();
    } else if (viewName === "admin") {
      if (views.dashboard) views.dashboard.style.display = "block";
      this.dashboard.renderAdminPanel();
    }
  }

  // Login Modal
  showLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) modal.style.display = "flex";
  }

  hideLoginModal() {
    const modal = document.getElementById("loginModal");
    if (modal) modal.style.display = "none";
  }

  closeSidebarOnMobile() {
    const sidebar = document.getElementById("appSidebar");
    if (sidebar && window.innerWidth <= 768) {
      sidebar.classList.remove("sidebar-open");
    }
  }

  // Umumiy eventlar
  bindGlobalEvents() {
    // 1. Tema almashtirish
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) themeBtn.onclick = () => this.toggleTheme();

    // 2. Navigatsiya tugmalari (Mashqlar, Reyting, Panel, Admin)
    document.querySelectorAll(".main-nav-link").forEach(link => {
      link.onclick = () => {
        const view = link.getAttribute("data-view");
        this.switchView(view);
        this.closeSidebarOnMobile();
      };
    });

    // 3. Mobil hamburger menyu
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const sidebar = document.getElementById("appSidebar");
    const closeSidebarBtn = document.getElementById("closeSidebarBtn");

    if (hamburgerBtn && sidebar) {
      hamburgerBtn.onclick = () => sidebar.classList.toggle("sidebar-open");
    }
    if (closeSidebarBtn && sidebar) {
      closeSidebarBtn.onclick = () => sidebar.classList.remove("sidebar-open");
    }

    // 4. Login modal formasi
    const loginForm = document.getElementById("loginForm");
    const nameInput = document.getElementById("loginNameInput");
    const phoneInput = document.getElementById("loginPhoneInput");
    const loginError = document.getElementById("loginErrorMessage");
    const loginPromptBtn = document.getElementById("sidebarLoginBtn");

    if (loginPromptBtn) {
      loginPromptBtn.onclick = () => this.showLoginModal();
    }

    // Ismning birinchi harfini avtomatik bosh harf qilish
    if (nameInput) {
      nameInput.addEventListener("input", (e) => {
        const val = e.target.value;
        if (val.length > 0) {
          e.target.value = val.charAt(0).toUpperCase() + val.slice(1);
        }
      });
    }

    // Telefon raqami faqat raqamlarni qabul qilish
    if (phoneInput) {
      phoneInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 7);
      });
    }

    if (loginForm) {
      loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const rawName = nameInput.value;
        const rawPhone = phoneInput.value;
        const rememberCheckbox = document.getElementById("rememberDeviceCheckbox");
        const rememberDevice = rememberCheckbox ? rememberCheckbox.checked : true;

        const res = await window.authManager.login(rawName, rawPhone, rememberDevice);
        if (!res.success) {
          loginError.style.display = "block";
          loginError.textContent = res.message;
        } else {
          loginError.style.display = "none";
          this.hideLoginModal();
          this.updateUserUI();
          // Agar joriy mashq ochiq bo'lsa, saqlangan javoblarini tiklash
          this.restoreUserAnswersForCurrentExercise();
        }
      };
    }

    // 5. Logout tugmasi
    const logoutBtn = document.getElementById("sidebarLogoutBtn");
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        if (confirm("Haqiqatan ham profildan chiqmoqchimisiz?")) {
          window.authManager.logout();
          this.updateUserUI();
          this.showLoginModal();
        }
      };
    }
  }
}

// Sahifa to'liq yuklangach ishga tushirish
window.addEventListener("DOMContentLoaded", () => {
  window.ieltsApp = new App();
});
