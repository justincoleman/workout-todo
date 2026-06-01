/* Persistence layer — everything lives in localStorage so the app works
 * fully offline with no backend. Three keys:
 *   wt.sessions  — array of completed workout sessions (the source of truth
 *                  for all charts and history)
 *   wt.active    — the in-progress session, if any (survives reloads)
 *   wt.settings  — user preferences (weight unit)
 */
const Store = (() => {
  const K_SESSIONS = "wt.sessions";
  const K_ACTIVE = "wt.active";
  const K_SETTINGS = "wt.settings";

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn("Store read failed for", key, e);
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Store write failed for", key, e);
    }
  }

  /* ---- settings ---- */
  function getSettings() {
    return Object.assign({ unit: "lbs" }, read(K_SETTINGS, {}));
  }
  function setSettings(patch) {
    const next = Object.assign(getSettings(), patch);
    write(K_SETTINGS, next);
    return next;
  }

  /* ---- completed sessions ---- */
  function getSessions() {
    return read(K_SESSIONS, []);
  }
  function saveSession(session) {
    const all = getSessions();
    all.push(session);
    // Keep newest first for history display.
    all.sort((a, b) => new Date(b.date) - new Date(a.date));
    write(K_SESSIONS, all);
  }
  function deleteSession(id) {
    write(K_SESSIONS, getSessions().filter((s) => s.id !== id));
  }

  /* ---- active (in-progress) session ---- */
  function getActive() {
    return read(K_ACTIVE, null);
  }
  function setActive(session) {
    if (session) write(K_ACTIVE, session);
    else localStorage.removeItem(K_ACTIVE);
  }
  function clearActive() {
    localStorage.removeItem(K_ACTIVE);
  }

  /* ---- progress queries ---- */

  // All logged data points for one exercise across every session, oldest first.
  // Each point summarises that day's performance for the exercise.
  function exerciseHistory(exId) {
    const points = [];
    getSessions().forEach((s) => {
      (s.entries || []).forEach((entry) => {
        if (entry.exId !== exId) return;
        const sets = (entry.sets || []).filter(
          (set) => set.weight != null || set.reps != null
        );
        if (!sets.length) return;
        let topWeight = 0;
        let totalVolume = 0;
        let totalReps = 0;
        let best1rm = 0;
        sets.forEach((set) => {
          const w = Number(set.weight) || 0;
          const r = Number(set.reps) || 0;
          topWeight = Math.max(topWeight, w);
          totalVolume += w * r;
          totalReps += r;
          // Epley estimated one-rep max.
          if (w > 0 && r > 0) best1rm = Math.max(best1rm, w * (1 + r / 30));
        });
        points.push({
          date: s.date,
          dayName: s.dayName,
          topWeight,
          totalVolume,
          totalReps,
          est1rm: Math.round(best1rm),
          setCount: sets.length,
          sets,
        });
      });
    });
    points.sort((a, b) => new Date(a.date) - new Date(b.date));
    return points;
  }

  // Most recent logged sets for an exercise, used to pre-fill the next session.
  function lastEntryFor(exId) {
    const sessions = getSessions(); // already newest-first
    for (const s of sessions) {
      const entry = (s.entries || []).find((e) => e.exId === exId);
      if (entry && (entry.sets || []).some((set) => set.weight != null))
        return entry;
    }
    return null;
  }

  // List of exercise ids that have at least one logged set, with metadata.
  function loggedExercises() {
    const seen = new Map();
    getSessions().forEach((s) => {
      (s.entries || []).forEach((entry) => {
        if (!(entry.sets || []).some((set) => set.weight != null || set.reps != null))
          return;
        const prev = seen.get(entry.exId);
        const count = (prev?.count || 0) + 1;
        const last = !prev || new Date(s.date) > new Date(prev.lastDate)
          ? s.date : prev.lastDate;
        seen.set(entry.exId, { exId: entry.exId, title: entry.title, count, lastDate: last });
      });
    });
    return [...seen.values()].sort((a, b) => new Date(b.lastDate) - new Date(a.lastDate));
  }

  function exportAll() {
    return JSON.stringify({ sessions: getSessions(), settings: getSettings() }, null, 2);
  }

  /* ---- completion queries ---- */
  function isSameDay(a, b) {
    const da = new Date(a), db = new Date(b);
    return (
      da.getFullYear() === db.getFullYear() &&
      da.getMonth() === db.getMonth() &&
      da.getDate() === db.getDate()
    );
  }

  // Completed sessions saved on the same calendar day as `dateLike` (newest first).
  function sessionsForDate(dateLike) {
    return getSessions().filter((s) => isSameDay(s.date, dateLike));
  }

  // Set of dayIds that have a completed session in the same Sunday-start week
  // as `refDate`.
  function completedDayIdsForWeek(refDate) {
    const ref = new Date(refDate);
    const start = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate() - ref.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const set = new Set();
    getSessions().forEach((s) => {
      const d = new Date(s.date);
      if (d >= start && d < end) set.add(s.dayId);
    });
    return set;
  }

  return {
    getSettings, setSettings,
    getSessions, saveSession, deleteSession,
    getActive, setActive, clearActive,
    exerciseHistory, lastEntryFor, loggedExercises,
    sessionsForDate, completedDayIdsForWeek,
    exportAll,
  };
})();
