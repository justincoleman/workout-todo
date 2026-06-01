/* Main SPA controller: hash routing + view rendering + session flow.
 * Depends on data.js, store.js, charts.js (loaded before this file).
 */
(() => {
  const appEl = document.getElementById("app");
  const navEl = document.getElementById("nav");

  /* ---------------- small helpers ---------------- */
  const h = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  const unit = () => Store.getSettings().unit;
  const fmtDate = (d) =>
    new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const fmtDay = (d) => new Date(d).toLocaleDateString(undefined, { weekday: "short" });
  const todayIndex = () => new Date().getDay();

  let restTimer = null; // { remaining, interval }

  /* ---------------- routing ---------------- */
  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, "");
    return raw.split("/").filter(Boolean); // e.g. ["day","tuesday"]
  }

  function render() {
    stopRestTimer();
    const parts = parseHash();
    const [route, arg] = parts;
    switch (route) {
      case undefined:
      case "":
      case "today":
        renderToday();
        break;
      case "plan":
        renderPlan();
        break;
      case "day":
        renderDay(arg);
        break;
      case "session":
        renderSession();
        break;
      case "progress":
        arg ? renderProgressDetail(arg) : renderProgressList();
        break;
      case "history":
        renderHistory();
        break;
      case "settings":
        renderSettings();
        break;
      default:
        renderToday();
    }
    renderNav(route || "today");
    window.scrollTo(0, 0);
  }

  function go(hash) {
    location.hash = hash;
  }

  function renderNav(active) {
    const items = [
      { id: "today", label: "Today", icon: "🏠", hash: "#/" },
      { id: "plan", label: "Plan", icon: "📋", hash: "#/plan" },
      { id: "progress", label: "Progress", icon: "📈", hash: "#/progress" },
      { id: "history", label: "History", icon: "🗓️", hash: "#/history" },
    ];
    const map = { "": "today", today: "today", day: "plan", plan: "plan",
      session: "today", progress: "progress", history: "history", settings: "history" };
    const cur = map[active] ?? active;
    navEl.innerHTML = items
      .map(
        (it) => `<a href="${it.hash}" class="nav-btn ${cur === it.id ? "active" : ""}">
          <span class="nav-ico">${it.icon}</span><span>${it.label}</span></a>`
      )
      .join("");
  }

  /* ---------------- Today view ---------------- */
  function renderToday() {
    const day = WORKOUT_PLAN.days[todayIndex()];
    const active = Store.getActive();
    const exCount = dayWorkExerciseCount(day);
    const isRest = day.groups.length === 1 && day.groups[0].exercises[0].type === "rest";

    let resumeBanner = "";
    if (active) {
      const total = active.exercises.length;
      const done = active.exercises.filter((e) => e.done).length;
      resumeBanner = `<div class="card banner">
        <div>
          <div class="banner-title">Workout in progress</div>
          <div class="muted">${h(active.dayName)} · ${done}/${total} done</div>
        </div>
        <a class="btn btn-primary" href="#/session">Resume</a>
      </div>`;
    }

    appEl.innerHTML = `
      <header class="screen-head">
        <div class="eyebrow">${fmtDate(new Date())}</div>
        <h1>Today · ${h(day.name)}</h1>
        <div class="muted">${h(day.focus)}</div>
      </header>
      ${resumeBanner}
      ${
        isRest
          ? `<div class="card rest-card">
              <div class="big-emoji">🛌</div>
              <h2>Rest &amp; recover</h2>
              <p class="muted">No lifting scheduled today. Let those muscles rebuild.</p>
            </div>`
          : `<div class="card day-summary">
              <div class="day-stats">
                <div><strong>${exCount}</strong><span>exercises</span></div>
                <div><strong>${day.groups.length}</strong><span>groups</span></div>
              </div>
              ${
                active
                  ? ""
                  : `<button class="btn btn-primary btn-block" data-start="${day.id}">Start workout</button>`
              }
              <a class="btn btn-ghost btn-block" href="#/day/${day.id}">View exercises</a>
            </div>`
      }
      <h3 class="section-title">This week</h3>
      <div class="week-strip">
        ${WORKOUT_PLAN.days
          .map((d, i) => {
            const rest = d.groups[0].exercises[0].type === "rest";
            return `<a href="#/day/${d.id}" class="week-pill ${i === todayIndex() ? "is-today" : ""} ${rest ? "is-rest" : ""}">
              <span class="wp-day">${h(d.name.slice(0, 3))}</span>
              <span class="wp-focus">${rest ? "Rest" : h(d.focus)}</span>
            </a>`;
          })
          .join("")}
      </div>
    `;
  }

  /* ---------------- Plan (week) view ---------------- */
  function renderPlan() {
    appEl.innerHTML = `
      <header class="screen-head">
        <h1>Weekly Plan</h1>
        <div class="muted">${h(WORKOUT_PLAN.name)}</div>
      </header>
      ${WORKOUT_PLAN.days
        .map((d) => {
          const rest = d.groups[0].exercises[0].type === "rest";
          return `<a href="#/day/${d.id}" class="card day-row ${rest ? "muted-row" : ""}">
            <div>
              <div class="day-row-name">${h(d.name)}</div>
              <div class="muted">${rest ? "Recovery" : h(d.focus)}</div>
            </div>
            <div class="day-row-meta">${rest ? "🛌" : dayWorkExerciseCount(d) + " ex →"}</div>
          </a>`;
        })
        .join("")}
    `;
  }

  /* ---------------- Day detail ---------------- */
  function renderDay(dayId) {
    const day = getDay(dayId);
    if (!day) return go("#/");
    const isRest = day.groups[0].exercises[0].type === "rest";
    const active = Store.getActive();

    appEl.innerHTML = `
      <header class="screen-head">
        <a class="back" href="#/plan">‹ Plan</a>
        <h1>${h(day.name)}</h1>
        <div class="muted">${h(day.focus)}</div>
      </header>
      ${
        isRest
          ? `<div class="card rest-card"><div class="big-emoji">🛌</div><h2>Rest Day</h2></div>`
          : day.groups
              .map(
                (g) => `<section class="group">
                  <h3 class="section-title">${h(g.name)}</h3>
                  ${g.exercises
                    .map((ex) => exerciseCard(ex))
                    .join("")}
                </section>`
              )
              .join("")
      }
      ${
        isRest
          ? ""
          : active && active.dayId === dayId
          ? `<a class="btn btn-primary btn-block sticky-action" href="#/session">Resume workout</a>`
          : `<button class="btn btn-primary btn-block sticky-action" data-start="${day.id}">Start workout</button>`
      }
    `;
  }

  function exerciseCard(ex) {
    const target =
      ex.type === "strength"
        ? `${ex.sets} × ${ex.reps} &middot; ${ex.rest}s rest`
        : ex.type === "cardio"
        ? `Cardio &middot; ${h(ex.duration || "")}`
        : "Rest";
    const last = ex.type === "strength" ? Store.lastEntryFor(ex.id) : null;
    const lastTxt = last
      ? `<div class="ex-last">Last: ${last.sets
          .filter((s) => s.weight != null)
          .map((s) => `${s.weight}${unit()}×${s.reps}`)
          .join(", ")}</div>`
      : "";
    return `<div class="card ex-card">
      ${ex.img ? `<img class="ex-thumb" loading="lazy" src="${h(ex.img)}" alt="">` : `<div class="ex-thumb ex-thumb-ph">💪</div>`}
      <div class="ex-card-body">
        <div class="ex-title">${h(ex.title)}</div>
        <div class="ex-target">${target}</div>
        ${lastTxt}
      </div>
      ${ex.type === "strength" ? `<a class="ex-chart-link" href="#/progress/${ex.id}" title="Progress">📈</a>` : ""}
    </div>`;
  }

  /* ---------------- Session flow ---------------- */
  function startSession(dayId) {
    const day = getDay(dayId);
    if (!day) return;
    const exercises = dayExercises(day)
      .filter((e) => e.type !== "rest")
      .map((ex) => {
        const setCount = ex.type === "strength" ? ex.sets : 1;
        const last = ex.type === "strength" ? Store.lastEntryFor(ex.id) : null;
        const sets = [];
        for (let i = 0; i < setCount; i++) {
          const prev = last && last.sets[i];
          sets.push({
            weight: prev && prev.weight != null ? prev.weight : "",
            reps: ex.type === "strength" ? ex.reps : "",
          });
        }
        return {
          exId: ex.id,
          title: ex.title,
          group: ex.group,
          type: ex.type,
          img: ex.img || null,
          duration: ex.duration || null,
          targetSets: ex.sets || null,
          targetReps: ex.reps || null,
          rest: ex.rest || null,
          sets,
          done: false,
        };
      });

    if (!exercises.length) {
      alert("Nothing to track on a rest day.");
      return;
    }
    const session = {
      id: Date.now(),
      date: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      dayId: day.id,
      dayName: day.name,
      current: 0,
      exercises,
    };
    Store.setActive(session);
    go("#/session");
  }

  function renderSession() {
    const s = Store.getActive();
    if (!s) return go("#/");
    const total = s.exercises.length;
    let idx = Math.min(s.current || 0, total - 1);
    const ex = s.exercises[idx];
    const doneCount = s.exercises.filter((e) => e.done).length;

    const dots = s.exercises
      .map(
        (e, i) =>
          `<button class="dot ${e.done ? "done" : ""} ${i === idx ? "cur" : ""}" data-jump="${i}" title="${h(e.title)}"></button>`
      )
      .join("");

    let body;
    if (ex.type === "strength") {
      const rows = ex.sets
        .map(
          (set, i) => `<div class="set-row ${set.logged ? "logged" : ""}">
            <div class="set-no">${i + 1}</div>
            <div class="set-field">
              <label>Weight (${unit()})</label>
              <input type="number" inputmode="decimal" step="any" min="0" data-set="${i}" data-field="weight"
                value="${set.weight === "" || set.weight == null ? "" : h(set.weight)}" placeholder="0">
            </div>
            <div class="set-field">
              <label>Reps</label>
              <input type="number" inputmode="numeric" step="1" min="0" data-set="${i}" data-field="reps"
                value="${set.reps === "" || set.reps == null ? "" : h(set.reps)}" placeholder="${h(ex.targetReps || "")}">
            </div>
          </div>`
        )
        .join("");
      body = `
        ${ex.img ? `<img class="session-img" src="${h(ex.img)}" alt="">` : ""}
        <div class="session-target">Target: ${ex.targetSets} sets × ${ex.targetReps} reps &middot; ${ex.rest}s rest</div>
        <div class="sets">${rows}</div>
        <div class="set-tools">
          <button class="btn btn-ghost btn-sm" data-add-set>+ Add set</button>
          ${ex.rest ? `<button class="btn btn-ghost btn-sm" data-rest="${ex.rest}">⏱ Rest ${ex.rest}s</button>` : ""}
        </div>
        <div id="rest-timer" class="rest-timer hidden"></div>
      `;
    } else {
      body = `
        ${ex.img ? `<img class="session-img" src="${h(ex.img)}" alt="">` : `<div class="big-emoji">🏃</div>`}
        <div class="session-target">Cardio${ex.duration ? " &middot; " + h(ex.duration) : ""}</div>
        <p class="muted center">Mark done when you've finished this.</p>
      `;
    }

    appEl.innerHTML = `
      <header class="session-head">
        <a class="back" data-quit>‹ Quit</a>
        <div class="session-progress-text">${doneCount}/${total} done</div>
      </header>
      <div class="progress-bar"><div class="progress-fill" style="width:${(doneCount / total) * 100}%"></div></div>
      <div class="dots">${dots}</div>
      <div class="card session-card">
        <div class="session-kicker">${h(ex.group)} · Exercise ${idx + 1} of ${total}</div>
        <h1 class="session-title">${h(ex.title)}</h1>
        ${body}
      </div>
      <div class="session-actions">
        <button class="btn btn-ghost" data-prev ${idx === 0 ? "disabled" : ""}>‹ Prev</button>
        <button class="btn ${ex.done ? "btn-ghost" : "btn-primary"}" data-done>${ex.done ? "✓ Done — Next ›" : "Mark done ›"}</button>
      </div>
      <button class="btn btn-finish btn-block" data-finish>Finish &amp; save workout</button>
    `;
  }

  function commitField(setIdx, field, value) {
    const s = Store.getActive();
    if (!s) return;
    const ex = s.exercises[Math.min(s.current || 0, s.exercises.length - 1)];
    const v = value === "" ? "" : Number(value);
    ex.sets[setIdx][field] = v;
    Store.setActive(s);
  }

  function markDoneAndAdvance() {
    const s = Store.getActive();
    if (!s) return;
    const idx = Math.min(s.current || 0, s.exercises.length - 1);
    s.exercises[idx].done = true;
    // Advance to the next not-yet-done exercise, else stay.
    let next = -1;
    for (let i = idx + 1; i < s.exercises.length; i++) {
      if (!s.exercises[i].done) { next = i; break; }
    }
    if (next === -1) {
      for (let i = 0; i < s.exercises.length; i++) {
        if (!s.exercises[i].done) { next = i; break; }
      }
    }
    s.current = next === -1 ? idx : next;
    Store.setActive(s);
    stopRestTimer();
    if (s.exercises.every((e) => e.done)) {
      // Everything done — offer to finish.
      renderSession();
    } else {
      renderSession();
    }
  }

  function finishSession() {
    const s = Store.getActive();
    if (!s) return;
    const entries = s.exercises.map((ex) => ({
      exId: ex.exId,
      title: ex.title,
      group: ex.group,
      type: ex.type,
      targetSets: ex.targetSets,
      targetReps: ex.targetReps,
      done: ex.done,
      sets: ex.sets
        .filter((set) => set.weight !== "" && set.weight != null || set.reps !== "" && set.reps != null)
        .map((set) => ({
          weight: set.weight === "" || set.weight == null ? null : Number(set.weight),
          reps: set.reps === "" || set.reps == null ? null : Number(set.reps),
        })),
    }));
    const saved = {
      id: s.id,
      date: s.date,
      startedAt: s.startedAt,
      completedAt: new Date().toISOString(),
      dayId: s.dayId,
      dayName: s.dayName,
      entries,
    };
    Store.saveSession(saved);
    Store.clearActive();
    renderSummary(saved);
  }

  function renderSummary(saved) {
    stopRestTimer();
    const logged = saved.entries.filter((e) => e.sets.length);
    const totalVolume = logged.reduce(
      (sum, e) => sum + e.sets.reduce((a, set) => a + (set.weight || 0) * (set.reps || 0), 0),
      0
    );
    appEl.innerHTML = `
      <div class="summary">
        <div class="big-emoji">🎉</div>
        <h1>Workout saved!</h1>
        <div class="muted">${h(saved.dayName)} · ${fmtDate(saved.date)}</div>
        <div class="summary-stats">
          <div><strong>${logged.length}</strong><span>exercises logged</span></div>
          <div><strong>${totalVolume.toLocaleString()}</strong><span>${unit()} total volume</span></div>
        </div>
        <a class="btn btn-primary btn-block" href="#/progress">View progress</a>
        <a class="btn btn-ghost btn-block" href="#/">Back to today</a>
      </div>
    `;
    navEl.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
  }

  /* ---------------- Rest timer ---------------- */
  function startRestTimer(seconds) {
    stopRestTimer();
    const elTimer = document.getElementById("rest-timer");
    if (!elTimer) return;
    elTimer.classList.remove("hidden");
    let remaining = seconds;
    const paint = () => {
      const m = Math.floor(remaining / 60);
      const sec = remaining % 60;
      elTimer.innerHTML = `<span class="rt-time">${m}:${String(sec).padStart(2, "0")}</span>
        <button class="btn btn-ghost btn-sm" data-rest-stop>Skip</button>`;
    };
    paint();
    restTimer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        stopRestTimer();
        if (navigator.vibrate) navigator.vibrate(200);
        const t = document.getElementById("rest-timer");
        if (t) {
          t.innerHTML = `<span class="rt-done">Rest done 💥</span>`;
          setTimeout(() => t.classList.add("hidden"), 2500);
        }
        return;
      }
      paint();
    }, 1000);
  }
  function stopRestTimer() {
    if (restTimer) {
      clearInterval(restTimer);
      restTimer = null;
    }
  }

  /* ---------------- Progress list ---------------- */
  function renderProgressList() {
    const logged = Store.loggedExercises();
    appEl.innerHTML = `
      <header class="screen-head">
        <h1>Progress</h1>
        <div class="muted">Tap an exercise to see your trend</div>
      </header>
      ${
        logged.length === 0
          ? `<div class="card empty">
              <div class="big-emoji">📈</div>
              <p>No data yet. Finish a workout and your charts will appear here.</p>
              <a class="btn btn-primary" href="#/">Start today's workout</a>
            </div>`
          : logged
              .map((l) => {
                const hist = Store.exerciseHistory(l.exId);
                const first = hist[0]?.topWeight ?? 0;
                const latest = hist[hist.length - 1]?.topWeight ?? 0;
                const delta = latest - first;
                const trend =
                  delta > 0 ? `<span class="up">▲ +${delta}${unit()}</span>`
                  : delta < 0 ? `<span class="down">▼ ${delta}${unit()}</span>`
                  : `<span class="flat">—</span>`;
                return `<a class="card prog-row" href="#/progress/${l.exId}">
                  <div>
                    <div class="ex-title">${h(l.title)}</div>
                    <div class="muted">${l.count} session${l.count === 1 ? "" : "s"} · best ${latest}${unit()}</div>
                  </div>
                  <div class="prog-trend">${trend}</div>
                </a>`;
              })
              .join("")
      }
    `;
  }

  /* ---------------- Progress detail ---------------- */
  function renderProgressDetail(exId) {
    const hist = Store.exerciseHistory(exId);
    // Find a friendly title from the plan or the logged data.
    let title = exId;
    for (const d of WORKOUT_PLAN.days) {
      const ex = dayExercises(d).find((e) => e.id === exId);
      if (ex) { title = ex.title; break; }
    }
    if (hist.length === 0) {
      appEl.innerHTML = `<header class="screen-head"><a class="back" href="#/progress">‹ Progress</a>
        <h1>${h(title)}</h1></header><div class="card empty"><p>No data yet.</p></div>`;
      return;
    }
    const latest = hist[hist.length - 1];
    const best = hist.reduce((m, p) => Math.max(m, p.topWeight), 0);
    const bestVol = hist.reduce((m, p) => Math.max(m, p.totalVolume), 0);

    appEl.innerHTML = `
      <header class="screen-head">
        <a class="back" href="#/progress">‹ Progress</a>
        <h1>${h(title)}</h1>
      </header>
      <div class="stat-grid">
        <div class="card stat"><strong>${best}${unit()}</strong><span>top weight</span></div>
        <div class="card stat"><strong>${latest.est1rm}${unit()}</strong><span>est. 1RM</span></div>
        <div class="card stat"><strong>${hist.length}</strong><span>sessions</span></div>
      </div>

      <div class="card chart-card">
        <div class="chart-head"><h3>Top set weight</h3><span class="muted">${unit()}</span></div>
        <canvas id="chart-weight" class="chart"></canvas>
      </div>
      <div class="card chart-card">
        <div class="chart-head"><h3>Total volume</h3><span class="muted">${unit()}·reps</span></div>
        <canvas id="chart-volume" class="chart"></canvas>
      </div>
      <div class="card chart-card">
        <div class="chart-head"><h3>Est. 1RM</h3><span class="muted">${unit()}</span></div>
        <canvas id="chart-1rm" class="chart"></canvas>
      </div>

      <h3 class="section-title">Session log</h3>
      ${[...hist].reverse().map((p) => `
        <div class="card log-row">
          <div>
            <div class="ex-title">${fmtDate(p.date)} <span class="muted">· ${h(p.dayName)}</span></div>
            <div class="muted">${p.sets.map((s) => `${s.weight ?? 0}${unit()}×${s.reps ?? 0}`).join(", ")}</div>
          </div>
          <div class="log-top">${p.topWeight}${unit()}</div>
        </div>`).join("")}
    `;

    // Draw after layout so canvas has dimensions.
    requestAnimationFrame(() => {
      Charts.drawLineChart(
        document.getElementById("chart-weight"),
        hist.map((p) => ({ x: p.date, y: p.topWeight })),
        { formatY: (v) => v + unit() }
      );
      Charts.drawLineChart(
        document.getElementById("chart-volume"),
        hist.map((p) => ({ x: p.date, y: p.totalVolume })),
        { color: "#60a5fa" }
      );
      Charts.drawLineChart(
        document.getElementById("chart-1rm"),
        hist.map((p) => ({ x: p.date, y: p.est1rm })),
        { color: "#f472b6", formatY: (v) => v + unit() }
      );
    });
  }

  /* ---------------- History ---------------- */
  function renderHistory() {
    const sessions = Store.getSessions();
    appEl.innerHTML = `
      <header class="screen-head">
        <h1>History</h1>
        <a class="back-right" href="#/settings">⚙︎ Settings</a>
      </header>
      ${
        sessions.length === 0
          ? `<div class="card empty"><div class="big-emoji">🗓️</div><p>No workouts logged yet.</p></div>`
          : sessions
              .map((s) => {
                const logged = (s.entries || []).filter((e) => e.sets.length);
                const vol = logged.reduce(
                  (sum, e) => sum + e.sets.reduce((a, st) => a + (st.weight || 0) * (st.reps || 0), 0),
                  0
                );
                return `<div class="card hist-row">
                  <div class="hist-main">
                    <div class="ex-title">${h(s.dayName)} <span class="muted">· ${fmtDay(s.date)} ${fmtDate(s.date)}</span></div>
                    <div class="muted">${logged.length} exercises · ${vol.toLocaleString()} ${unit()} volume</div>
                  </div>
                  <button class="icon-btn" data-del="${s.id}" title="Delete">🗑</button>
                </div>`;
              })
              .join("")
      }
    `;
  }

  /* ---------------- Settings ---------------- */
  function renderSettings() {
    const st = Store.getSettings();
    appEl.innerHTML = `
      <header class="screen-head">
        <a class="back" href="#/history">‹ History</a>
        <h1>Settings</h1>
      </header>
      <div class="card setting-row">
        <div><div class="ex-title">Weight unit</div><div class="muted">Used across logging &amp; charts</div></div>
        <div class="seg">
          <button class="seg-btn ${st.unit === "lbs" ? "on" : ""}" data-unit="lbs">lbs</button>
          <button class="seg-btn ${st.unit === "kg" ? "on" : ""}" data-unit="kg">kg</button>
        </div>
      </div>
      <div class="card">
        <div class="ex-title">Your data</div>
        <p class="muted">All workouts are stored privately on this device.</p>
        <button class="btn btn-ghost btn-block" data-export>Export data (JSON)</button>
        <button class="btn btn-danger btn-block" data-reset>Erase all history</button>
      </div>
      <p class="muted center small">${h(WORKOUT_PLAN.name)}</p>
    `;
  }

  /* ---------------- event delegation ---------------- */
  appEl.addEventListener("click", (e) => {
    const t = e.target.closest("[data-start],[data-done],[data-prev],[data-jump],[data-finish],[data-quit],[data-add-set],[data-rest],[data-rest-stop],[data-del],[data-unit],[data-reset],[data-export]");
    if (!t) return;

    if (t.dataset.start != null) return startSession(t.dataset.start);
    if (t.dataset.done != null) return markDoneAndAdvance();
    if (t.dataset.prev != null) {
      const s = Store.getActive();
      if (s) { s.current = Math.max(0, (s.current || 0) - 1); Store.setActive(s); renderSession(); }
      return;
    }
    if (t.dataset.jump != null) {
      const s = Store.getActive();
      if (s) { s.current = Number(t.dataset.jump); Store.setActive(s); renderSession(); }
      return;
    }
    if (t.dataset.addSet != null) {
      const s = Store.getActive();
      if (s) {
        const ex = s.exercises[Math.min(s.current || 0, s.exercises.length - 1)];
        ex.sets.push({ weight: "", reps: ex.targetReps || "" });
        Store.setActive(s);
        renderSession();
      }
      return;
    }
    if (t.dataset.rest != null) return startRestTimer(Number(t.dataset.rest));
    if (t.dataset.restStop != null) {
      stopRestTimer();
      const tm = document.getElementById("rest-timer");
      if (tm) tm.classList.add("hidden");
      return;
    }
    if (t.dataset.finish != null) {
      const s = Store.getActive();
      const remaining = s ? s.exercises.filter((x) => !x.done).length : 0;
      if (remaining > 0 && !confirm(`${remaining} exercise(s) not marked done. Save workout anyway?`)) return;
      return finishSession();
    }
    if (t.dataset.quit != null) {
      if (confirm("Quit this workout? Your in-progress entries will be discarded.")) {
        Store.clearActive();
        go("#/");
      }
      return;
    }
    if (t.dataset.del != null) {
      if (confirm("Delete this workout from history? This can't be undone.")) {
        Store.deleteSession(Number(t.dataset.del));
        renderHistory();
      }
      return;
    }
    if (t.dataset.unit != null) {
      Store.setSettings({ unit: t.dataset.unit });
      renderSettings();
      return;
    }
    if (t.dataset.export != null) {
      const blob = new Blob([Store.exportAll()], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `workout-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }
    if (t.dataset.reset != null) {
      if (confirm("Erase ALL workout history and active session? This can't be undone.")) {
        Store.getSessions().forEach((s) => Store.deleteSession(s.id));
        Store.clearActive();
        go("#/");
      }
      return;
    }
  });

  // Live-save set inputs during a session.
  appEl.addEventListener("input", (e) => {
    const inp = e.target.closest("input[data-set]");
    if (!inp) return;
    commitField(Number(inp.dataset.set), inp.dataset.field, inp.value);
  });

  /* ---------------- boot ---------------- */
  window.addEventListener("hashchange", render);
  render();

  // Register service worker for offline + installability.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((err) =>
        console.warn("SW registration failed:", err)
      );
    });
  }
})();
