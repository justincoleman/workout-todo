/* Workout plan data — adapted from the "Frank Dumbbell Only" program
 * (muscleandstrength.com). Each strength exercise has a stable `id` (slug)
 * so progress is tracked per movement even when it appears on multiple days.
 *
 * Split: lifting on Mon / Wed / Fri, cardio on Tue / Thu / Sat, rest Sunday.
 *
 * Exercise types:
 *   "strength" — logged with weight + reps per set (charted over time)
 *   "cardio"   — logged as completed, optional duration
 *   "rest"     — rest / recovery day marker
 */
const IMG = (file) => `images/workouts/${file}`;

const WORKOUT_PLAN = {
  name: "Frank's Dumbbell-Only Workout",
  source: "https://www.muscleandstrength.com/workouts/frank-dumbbell-only-workout",
  // Order matches JS Date.getDay() (0 = Sunday) so "today" maps directly.
  days: [
    {
      id: "sunday",
      name: "Sunday",
      focus: "Recovery",
      groups: [
        {
          name: "Recovery",
          exercises: [{ id: "rest-sunday", title: "Rest Day", type: "rest" }],
        },
      ],
    },
    {
      id: "monday",
      name: "Monday",
      focus: "Arms & Core",
      groups: [
        {
          name: "Biceps",
          exercises: [
            { id: "zottman-curl", title: "Zottman Curls", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("zottman-curl.jpg") },
            { id: "drag-curl", title: "Drag Curl", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("drag-curl.jpg") },
            { id: "hammer-curl", title: "Hammer Curl", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("hammer-curl.jpg") },
            { id: "cheat-curl", title: "Cheat Curl", type: "strength", sets: 4, reps: 5, rest: 120, img: IMG("cheat-curl.jpg") },
            { id: "preacher-curl", title: "Preacher Curl", type: "strength", sets: 4, reps: 8, rest: 60, img: IMG("preacher-curl.jpg") },
            { id: "cable-bicep-curl", title: "Cable Bicep Curl", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("cable-bicep-curl.jpg") },
          ],
        },
        {
          name: "Triceps",
          exercises: [
            { id: "neutral-grip-press", title: "Neutral Grip Press", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("neutral-grip-press.gif") },
            { id: "lying-triceps-extension", title: "Lying Triceps Extension", type: "strength", sets: 4, reps: 10, rest: 120, img: IMG("lying-triceps-extension.jpg") },
            { id: "tate-press", title: "Tate Press", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("tate-press.jpg") },
            { id: "underhand-kickback", title: "Underhand Kickback", type: "strength", sets: 4, reps: 10, rest: 120, img: IMG("underhand-kickback.jpg") },
            { id: "one-arm-overhead-extension", title: "One Arm Overhead Extension", type: "strength", sets: 4, reps: 10, rest: 120, img: IMG("one-arm-overhead-extension.jpg") },
            { id: "triceps-cable-pushdown", title: "Triceps Cable Push-down", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("triceps-cable-pushdown.jpg") },
          ],
        },
        {
          name: "Core",
          exercises: [
            { id: "bench-decline-situps", title: "Bench Decline Sit-ups", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("bench-decline-situps.jpg") },
            { id: "reverse-woodchopper", title: "Reverse Woodchoppers", type: "strength", sets: 4, reps: 8, rest: 60, img: IMG("reverse-woodchopper.png") },
          ],
        },
      ],
    },
    {
      id: "tuesday",
      name: "Tuesday",
      focus: "Cardio",
      groups: [
        {
          name: "Cardio",
          exercises: [
            { id: "jogging", title: "Jogging — moderate intensity", type: "cardio", duration: "30 min" },
          ],
        },
      ],
    },
    {
      id: "wednesday",
      name: "Wednesday",
      focus: "Shoulders & Back",
      groups: [
        {
          name: "Shoulders",
          exercises: [
            { id: "arnold-press", title: "Arnold Press", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("arnold-press.jpg") },
            { id: "neutral-grip-overhead-press", title: "Neutral Grip Overhead Press", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("neutral-grip-overhead-press.jpg") },
            { id: "lateral-raises", title: "Lateral Raises", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("lateral-raises.jpg") },
            { id: "rear-delt-raises", title: "Rear Delt Raises", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("rear-delt-raises.jpg") },
          ],
        },
        {
          name: "Back",
          exercises: [
            { id: "face-pulls", title: "Face Pulls", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("face-pulls.jpg") },
            { id: "single-arm-row", title: "Single Arm Row", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("one-arm-dumbbell-row.jpg") },
            { id: "straight-arm-pulldown", title: "Straight Arm Pull-down", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("straight-arm-pulldown.jpg") },
            { id: "back-fly", title: "Back Fly", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("dumbbell-reverse-fly.jpg") },
          ],
        },
        {
          name: "Core",
          exercises: [
            { id: "bench-decline-situps", title: "Bench Decline Sit-ups", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("bench-decline-situps.jpg") },
            { id: "cable-twist", title: "Cable Twist", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("cable-twist.jpg") },
          ],
        },
      ],
    },
    {
      id: "thursday",
      name: "Thursday",
      focus: "Cardio",
      groups: [
        {
          name: "Cardio",
          exercises: [
            { id: "hiit", title: "HIIT Running / Walking", type: "cardio", duration: "20 min" },
          ],
        },
      ],
    },
    {
      id: "friday",
      name: "Friday",
      focus: "Chest & Legs",
      groups: [
        {
          name: "Chest",
          exercises: [
            { id: "piston-press", title: "Piston Press", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("piston-press.jpg") },
            { id: "incline-fly", title: "Incline Fly", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("incline-fly.jpg") },
            { id: "decline-bench-press", title: "Decline Bench Press", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("decline-bench-press.jpg") },
            { id: "incline-bench-press", title: "Incline Bench Press", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("incline-bench-press.jpg") },
            { id: "pushups", title: "Push-ups", type: "strength", sets: 5, reps: 10, rest: 60, img: IMG("dumbbell-pushups.png") },
            { id: "hammer-press", title: "Hammer Press", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("hammer-press.jpg") },
          ],
        },
        {
          name: "Legs",
          exercises: [
            { id: "weighted-squats", title: "Weighted Squats", type: "strength", sets: 4, reps: 10, rest: 120, img: IMG("dumbbell-squat.jpg") },
            { id: "weighted-lunges", title: "Weighted Lunges", type: "strength", sets: 4, reps: 10, rest: 120, img: IMG("dumbbell-lunges.jpg") },
            { id: "calf-raises", title: "Weighted Calf Raises", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("calf-raises.jpg") },
          ],
        },
        {
          name: "Core",
          exercises: [
            { id: "bench-decline-situps", title: "Bench Decline Sit-ups", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("bench-decline-situps.jpg") },
            { id: "woodchopper", title: "Woodchoppers", type: "strength", sets: 4, reps: 10, rest: 60, img: IMG("woodchopper.jpg") },
          ],
        },
      ],
    },
    {
      id: "saturday",
      name: "Saturday",
      focus: "Cardio",
      groups: [
        {
          name: "Cardio",
          exercises: [
            { id: "basketball", title: "Basketball", type: "cardio", duration: "45 min" },
          ],
        },
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
