'use strict';

angular.module('workoutApp')
    .factory('workouts', [function () {
    var workouts = {
        days: [
            {
                id: 0,
                name: 'Sunday',
                status: 'inactive',
                isActive: false,
                zones: [
                    {
                        name: "Cardio",
                        counter: 0,
                        id: 0,
                        workout: [
                            {
                                title: "Basketball",
                                duration: "",
                                sets: "",
                                reps: "",
                                rest: "",
                                completed: false
                            }
                        ]
                    }
                ]
            },
            {
                id: 1,
                name: 'Monday',
                status: 'inactive',
                isActive: false,
                zones: [
                    {
                        name: "Cardio",
                        counter: 0,
                        id: 1,
                        workout: [
                            {
                                title: "Jogging - moderate intensity",
                                duration: "30 minutes",
                                sets: "",
                                reps: "",
                                rest: "",
                                completed: false
                            },
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: 'Tuesday',
                status: 'inactive',
                isActive: false,
                zones: [
                    {
                        name: "Biceps",
                        counter: 0,
                        id: 2,
                        workout: [
                            {
                                title: "Zottman Curls",
                                img_path: "images/workouts/zottman-curl.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Drag Curl",
                                img_path: "images/workouts/drag-curl.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Hammer Curl",
                                img_path: "images/workouts/hammer-curl.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Cheat Curl",
                                img_path: "images/workouts/cheat-curl.jpg",
                                duration: "",
                                sets: 4,
                                reps: 5,
                                rest: 120,
                                completed: false
                            },
                            {
                                title: "Preacher Curl",
                                img_path: "images/workouts/preacher-curl.jpg",
                                duration: "",
                                sets: 4,
                                reps: 8,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Cable Bicep Curl",
                                img_path: "images/workouts/cable-bicep-curl.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Triceps",
                        counter: 0,
                        id: 2,
                        workout: [
                            {
                                title: "Neutral Grip Press",
                                img_path: "images/workouts/neutral-grip-press.gif",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },

                            {
                                title: "Lying Triceps Extension",
                                img_path: "images/workouts/lying-triceps-extension.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 120,
                                completed: false
                            },
                            {
                                title: "Tate Press",
                                img_path: "images/workouts/tate-press.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Underhand Kickback",
                                img_path: "images/workouts/underhand-kickback.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 120,
                                completed: false
                            },
                            {
                                title: "One Arm Overhead Extension",
                                img_path: "images/workouts/one-arm-overhead-extension.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 120,
                                completed: false
                            },
                            {
                                title: "Triceps Cable Push-down",
                                img_path: "images/workouts/triceps-cable-pushdown.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Core",
                        counter: 0,
                        id: 2,
                        workout: [
                            {
                                title: "Bench Decline Sit-ups",
                                img_path: "images/workouts/bench-decline-situps.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Reverse Woodchoppers",
                                img_path: "images/workouts/reverse-woodchopper.png",
                                duration: "",
                                sets: 4,
                                reps: 8,
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Cardio",
                        counter: 0,
                        id: 2,
                        workout: [
                            {
                                title: "HIIT Running/Walking",
                                duration: "10 minutes",
                                sets: "",
                                reps: "",
                                rest: "",
                                completed: false
                            }
                        ]
                    }
                ],
            },
            {
                id: 3,
                name: 'Wednesday',
                status: 'inactive',
                isActive: false,
                zones: [
                    {
                        name: "Shoulders",
                        counter: 0,
                        id: 3,
                        workout: [
                            {
                                title: "Arnold Press",
                                img_path: "images/workouts/arnold-press.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Neutral Grip Overhead Press",
                                img_path: "images/workouts/neutral-grip-overhead-press.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Lateral Raises",
                                img_path: "images/workouts/lateral-raises.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Rear Delt Raises",
                                img_path: "images/workouts/rear-delt-raises.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Back",
                        counter: 0,
                        id: 3,
                        workout: [
                            {
                                title: "Face Pulls",
                                img_path: "images/workouts/face-pulls.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Single Arm Row",
                                img_path: "images/workouts/one-arm-dumbbell-row.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Straight Arm Pull-down",
                                img_path: "images/workouts/straight-arm-pulldown.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Back fly",
                                img_path: "images/workouts/dumbbell-reverse-fly.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Core",
                        counter: 0,
                        id: 3,
                        workout: [
                            {
                                title: "Bench Decline Sit-ups",
                                img_path: "images/workouts/bench-decline-situps.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Cable Twist",
                                img_path: "images/workouts/cable-twist.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Cardio",
                        counter: 0,
                        id: 3,
                        workout: [
                            {
                                title: "Weighted Dumbbell Walking - 10 minutes",
                                duration: "10 minutes",
                                sets: "",
                                reps: "",
                                rest: "",
                                completed: false
                            },
                        ]
                    }
                ]
            },
            {
                id: 4,
                name: 'Thursday',
                status: 'inactive',
                isActive: false,
                zones: [
                    {
                        name: "Recovery",
                        counter: 0,
                        id: 4,
                        workout: [
                            {
                                title: "Rest Day",
                                duration: "",
                                sets: "",
                                reps: "",
                                rest: "",
                                completed: false
                            }
                        ]
                    }
                ],
            },
            {
                id: 5,
                name: 'Friday',
                status: 'inactive',
                isActive: false,
                zones: [
                    {
                        name: "Chest",
                        counter: 0,
                        id: 5,
                        workout: [
                            {
                                title: "Piston Press",
                                img_path: "images/workouts/piston-press.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Incline Fly",
                                img_path: "images/workouts/incline-fly.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Decline Bench Press",
                                img_path: "images/workouts/decline-bench-press.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Incline Bench Press",
                                img_path: "images/workouts/incline-bench-press.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Push-ups",
                                img_path: "images/workouts/dumbbell-pushups.png",
                                duration: "",
                                sets: 5,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Hammer Press",
                                img_path: "images/workouts/hammer-press.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Legs",
                        counter: 0,
                        id: 5,
                        workout: [
                            {
                                title: "Weighted Squats",
                                img_path: "images/workouts/dumbbell-squat.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "120 seconds",
                                completed: false
                            },
                            {
                                title: "Weighted Lunges",
                                img_path: "images/workouts/dumbbell-lunges.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "120 seconds",
                                completed: false
                            },
                            {
                                title: "Weighted Calf Raises",
                                img_path: "images/workouts/calf-raises.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Core",
                        counter: 0,
                        id: 5,
                        workout: [
                            {
                                title: "Bench Decline Sit-ups",
                                img_path: "images/workouts/bench-decline-situps.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Woodchoppers",
                                img_path: "images/workouts/woodchopper.jpg",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Cardio",
                        counter: 0,
                        id: 5,
                        workout: [
                            {
                                title: "High Incline Walking",
                                duration: "20 minutes",
                                sets: "",
                                reps: "",
                                rest: "",
                                completed: false
                            }
                        ]
                    }
                ],
            },
            {
                id: 6,
                name: 'Saturday',
                status: 'inactive',
                isActive: false,
                zones: [
                    {
                        name: "Recovery",
                        counter: 0,
                        id: 6,
                        workout: [
                            {
                                title: "Rest day!",
                                duration: "",
                                sets: "",
                                reps: "",
                                rest: "",
                                completed: false
                            }
                        ]
                    }
                ]
            }
        ]
    };

    return workouts;
}]);