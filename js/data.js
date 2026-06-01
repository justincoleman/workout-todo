/* Workout plan data — the "Frankoman Dumbbell Only Split" exactly as published
 * by Team Muscle & Strength (build muscle, beginner, 3 days/week, 10 weeks).
 * https://www.muscleandstrength.com/workouts/frankoman-dumbbell-only-split.html
 *
 * Lifting Mon / Wed / Fri; cardio Tue / Thu / Sat; rest Sunday.
 *
 * `reps` is a per-set array matching the published rep scheme
 *   (e.g. [12, 10, 10, 8] = set 1 → 12 reps, set 2 → 10, …).
 * Rest times are NOT specified in the source PDF — sensible defaults are used
 * (90s for the main compound lifts, 60s for isolation) and can be ignored.
 *
 * Exercise types:
 *   "strength" — logged with weight + reps per set (charted over time)
 *   "cardio"   — logged as completed, optional duration
 *   "rest"     — rest / recovery day marker
 */
const IMG = (file) => `images/workouts/${file}`;

const WORKOUT_PLAN = {
  name: "Frankoman Dumbbell-Only Split",
  source: "https://www.muscleandstrength.com/workouts/frankoman-dumbbell-only-split.html",
  // Order matches JS Date.getDay() (0 = Sunday) so "today" maps directly.
  days: [
    {
      id: "sunday",
      name: "Sunday",
      focus: "Recovery",
      groups: [
        { name: "Recovery", exercises: [{ id: "rest-sunday", title: "Rest Day", type: "rest" }] },
      ],
    },
    {
      id: "monday",
      name: "Monday",
      focus: "Chest & Triceps",
      groups: [
        {
          name: "Chest",
          exercises: [
            { id: "dumbbell-floor-press", title: "Dumbbell Floor Press", type: "strength", sets: 4, reps: [12, 10, 10, 8], rest: 90, img: IMG("dumbbell-floor-press.jpg") }, // no-bench sub for Incline DB Bench Press
            { id: "neutral-grip-floor-press", title: "Neutral-Grip Dumbbell Floor Press", type: "strength", sets: 4, reps: [12, 10, 10, 8], rest: 90, img: IMG("neutral-grip-floor-press.jpg") }, // no-bench sub for DB Bench Press (palms-in floor press)
            { id: "floor-dumbbell-flys", title: "Floor Dumbbell Flys", type: "strength", sets: 3, reps: [12, 12, 12], rest: 60, img: IMG("floor-dumbbell-flys.jpg") }, // no-bench sub for DB Flys
          ],
        },
        {
          name: "Triceps",
          exercises: [
            { id: "dumbbell-skullcrusher", title: "Dumbbell Skullcrusher", type: "strength", sets: 3, reps: [12, 12, 12], rest: 60, img: IMG("dumbbell-skullcrusher.jpg") },
            { id: "dumbbell-tricep-kickback", title: "Dumbbell Tricep Kickback", type: "strength", sets: 3, reps: [12, 12, 12], rest: 60, img: IMG("dumbbell-tricep-kickback.jpg") },
            { id: "standing-one-arm-overhead-extension", title: "Standing One-Arm Overhead Extension", type: "strength", sets: 3, reps: [12, 12, 12], rest: 60, img: IMG("standing-one-arm-overhead-extension.jpg") }, // no-bench sub for One Arm Seated DB Extension
          ],
        },
      ],
    },
    {
      id: "tuesday",
      name: "Tuesday",
      focus: "Cardio",
      groups: [
        { name: "Cardio", exercises: [{ id: "jogging", title: "Jogging — moderate intensity", type: "cardio", duration: "30 min" }] },
      ],
    },
    {
      id: "wednesday",
      name: "Wednesday",
      focus: "Back & Biceps",
      groups: [
        {
          name: "Back",
          exercises: [
            { id: "one-arm-dumbbell-row", title: "One Arm Dumbbell Row", type: "strength", sets: 5, reps: [12, 10, 10, 8, 6], rest: 90, img: IMG("one-arm-dumbbell-row.jpg") },
            { id: "bent-over-dumbbell-row", title: "Bent Over Dumbbell Row", type: "strength", sets: 5, reps: [12, 10, 10, 8, 6], rest: 90, img: IMG("bent-over-dumbbell-row.jpg") },
            { id: "floor-dumbbell-pullover", title: "Floor Dumbbell Pullover", type: "strength", sets: 2, reps: [12, 10], rest: 60, img: IMG("floor-dumbbell-pullover.jpg") }, // no-bench sub for DB Pullover
          ],
        },
        {
          name: "Biceps",
          exercises: [
            { id: "dumbbell-drag-curl", title: "Dumbbell Drag Curl", type: "strength", sets: 3, reps: [10, 10, 10], rest: 60, img: IMG("dumbbell-drag-curl.jpg") }, // no-bench sub for Incline DB Curl
            { id: "standing-dumbbell-curl", title: "Standing Dumbbell Curl", type: "strength", sets: 3, reps: [10, 10, 10], rest: 60, img: IMG("standing-dumbbell-curl.jpg") },
            { id: "cross-body-hammer-curl", title: "Cross Body Hammer Curl", type: "strength", sets: 2, reps: [10, 10], rest: 60, img: IMG("cross-body-hammer-curl.jpg") },
          ],
        },
      ],
    },
    {
      id: "thursday",
      name: "Thursday",
      focus: "Cardio",
      groups: [
        { name: "Cardio", exercises: [{ id: "hiit", title: "HIIT Running / Walking", type: "cardio", duration: "20 min" }] },
      ],
    },
    {
      id: "friday",
      name: "Friday",
      focus: "Legs & Shoulders",
      groups: [
        {
          name: "Quads",
          exercises: [
            { id: "dumbbell-lunge", title: "Dumbbell Lunge", type: "strength", sets: 4, reps: [12, 10, 10, 8], rest: 90, img: IMG("dumbbell-lunge.jpg") },
            { id: "dumbbell-step-up", title: "Dumbbell Step Up", type: "strength", sets: 3, reps: [12, 12, 12], rest: 90, img: IMG("dumbbell-step-up.jpg") },
            { id: "dumbbell-squat", title: "Dumbbell Squat", type: "strength", sets: 4, reps: [12, 10, 10, 8], rest: 90, img: IMG("dumbbell-squat.jpg") },
          ],
        },
        {
          name: "Hamstrings",
          exercises: [
            { id: "dumbbell-stiff-leg-deadlift", title: "Dumbbell Stiff Leg Deadlift", type: "strength", sets: 4, reps: [12, 10, 10, 8], rest: 90, img: IMG("dumbbell-stiff-leg-deadlift.jpg") },
          ],
        },
        {
          name: "Calves",
          exercises: [
            { id: "seated-dumbbell-calf-raise", title: "Seated Dumbbell Calf Raise", type: "strength", sets: 2, reps: [15, 12], rest: 60, img: IMG("seated-dumbbell-calf-raise.jpg") },
            { id: "dumbbell-standing-calf-raise", title: "Dumbbell Standing Calf Raise", type: "strength", sets: 2, reps: [12, 10], rest: 60, img: IMG("dumbbell-standing-calf-raise.jpg") },
          ],
        },
        {
          name: "Shoulders",
          exercises: [
            { id: "standing-dumbbell-press", title: "Standing Dumbbell Press", type: "strength", sets: 4, reps: [12, 10, 10, 8], rest: 90, img: IMG("standing-dumbbell-press.jpg") },
            { id: "dumbbell-lateral-raise", title: "Dumbbell Lateral Raise", type: "strength", sets: 3, reps: [12, 10, 10], rest: 60, img: IMG("dumbbell-lateral-raise.jpg") },
            { id: "bent-over-dumbbell-reverse-fly", title: "Bent Over Dumbbell Reverse Fly", type: "strength", sets: 3, reps: [12, 10, 10], rest: 60, img: IMG("bent-over-dumbbell-reverse-fly.jpg") },
            { id: "dumbbell-shrug", title: "Dumbbell Shrug", type: "strength", sets: 4, reps: [12, 10, 10, 8], rest: 60, img: IMG("dumbbell-shrug.jpg") },
          ],
        },
      ],
    },
    {
      id: "saturday",
      name: "Saturday",
      focus: "Cardio",
      groups: [
        { name: "Cardio", exercises: [{ id: "basketball", title: "Basketball", type: "cardio", duration: "45 min" }] },
      ],
    },
  ],
};

/** Flat list of every exercise in a day, in order, with its group attached. */
function dayExercises(day) {
  const out = [];
  day.groups.forEach((g) => {
    g.exercises.forEach((ex) => out.push({ ...ex, group: g.name }));
  });
  return out;
}

function getDay(dayId) {
  return WORKOUT_PLAN.days.find((d) => d.id === dayId);
}

/** Total number of trackable (non-rest) exercises in a day. */
function dayWorkExerciseCount(day) {
  return dayExercises(day).filter((e) => e.type !== "rest").length;
}

/** Per-set target reps as an array (normalises number | array). */
function repScheme(ex) {
  if (Array.isArray(ex.reps)) return ex.reps.slice();
  if (ex.reps != null) return Array(ex.sets || 1).fill(ex.reps);
  return [];
}

/** Human-readable rep scheme, e.g. "12, 10, 10, 8" or "12". */
function formatReps(reps) {
  if (Array.isArray(reps)) {
    // Collapse a uniform scheme ([12,12,12]) down to a single number.
    return reps.every((r) => r === reps[0]) ? String(reps[0]) : reps.join(", ");
  }
  return String(reps ?? "");
}
