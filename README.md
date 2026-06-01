# Dumbbell Workout Tracker

An installable **Progressive Web App** for the *Frankoman Dumbbell-Only Split*.
Browse the plan day-by-day, run a guided workout one exercise at a time, log the
weight and reps you actually did, and watch your progress trend on charts over time.

Everything runs client-side with **zero dependencies and no build step** — plain
HTML, CSS and vanilla JavaScript. All your data is stored privately on your device
via `localStorage`, and the app works fully offline once loaded.

## Features

- **Weekly plan** — all 7 days with their muscle groups and exercises (sets, reps, rest).
- **Guided sessions** — start a workout and step through one exercise at a time;
  log weight + reps per set, mark it done, advance to the next. Inputs are
  pre-filled from your last session so you only adjust what changed.
- **Rest timer** — tap to count down the prescribed rest between sets.
- **Progress charts** — top-set weight, total volume, and estimated 1RM plotted
  over time for every exercise (lightweight hand-rolled canvas charts).
- **History** — review and manage every saved workout.
- **Offline + installable** — service worker caches the app shell and exercise
  images; add it to your home screen for a native-app feel.
- **lbs / kg** toggle and JSON export of your data.

## Run it locally

It's static — serve the folder with any web server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

A service worker requires `http://localhost` or HTTPS (it won't register from
`file://`).

## Deploy

Works as-is on any static host. For **GitHub Pages**, enable Pages on this
repository (serve from the branch root) and the app is live — `start_url` and
`scope` are relative so it works from a project subpath.

## Project structure

```
index.html              app shell
manifest.webmanifest    PWA manifest
sw.js                   service worker (offline caching)
css/styles.css          styles
js/data.js              the workout plan
js/store.js             localStorage persistence + progress queries
js/charts.js            dependency-free canvas line charts
js/app.js               routing, views, and the session flow
icons/                  app icons
images/workouts/        exercise images
```

## Credits

Workout program: [Frankoman Dumbbell Only Split](https://www.muscleandstrength.com/workouts/frankoman-dumbbell-only-split.html) by Team Muscle & Strength.

Exercise images are from the public-domain [free-exercise-db](https://github.com/yuhonas/free-exercise-db) (Unlicense).
