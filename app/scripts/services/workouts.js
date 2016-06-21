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
                        workout: [
                            {
                                title: "Jogging - moderate intensity",
                                duration: 30,
                                sets: 1,
                                reps: "",
                                rest: "",
                                completed: false
                            }
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
                        workout: [
                            {
                                title: "Curls",
                                duration: "",
                                sets: 4,
                                reps: "15, 12, 8, 8",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Drag Curl",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Hammer Curl",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Cheat Curl",
                                duration: "",
                                sets: 4,
                                reps: "8",
                                rest: 120,
                                completed: false
                            },
                            {
                                title: "Preacher Curl",
                                duration: "",
                                sets: 4,
                                reps: "8",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Cable Bicep Curl",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Triceps",
                        workout: [
                            {
                                title: "Neutral Grip Press",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },

                            {
                                title: "Lying Triceps Extension",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 120,
                                completed: false
                            },
                            {
                                title: "Tate Press",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Underhand Kickback",
                                duration: "",
                                sets: 4,
                                reps: "8",
                                rest: 120,
                                completed: false
                            },
                            {
                                title: "One Arm Overhead Exentsion",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 120,
                                completed: false
                            },
                            {
                                title: "Cable Triceps Pulldown",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Core",
                        workout: [
                            {
                                title: "Bench Decline Sit-ups",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Cable Wood-chop (upward)",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Cardio",
                        workout: [
                            {
                                title: "HIIT Running/Walking",
                                duration: 10,
                                sets: 1,
                                reps: "",
                                rest: 60,
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
                        workout: [
                            {
                                title: "Arnold Press",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Neutral Grip Overhead Press",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Lateral Raises",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Rear Delt Raises",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Back",
                        workout: [
                            {
                                title: "Cable Back Row",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Single Arm Row",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Seated Row",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Standing Cable Row",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Core",
                        workout: [
                            {
                                title: "Bench Decline Sit-ups",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            },
                            {
                                title: "Cable Wood-chop (level)",
                                duration: "",
                                sets: 4,
                                reps: "10",
                                rest: 60,
                                completed: false
                            }
                        ]
                    },
                    {
                        name: "Cardio",
                        workout: [
                            {
                                title: "Weighted Dumbbell Walking - 10 minutes",
                                duration: "10 minutes",
                                sets: 4,
                                reps: "10",
                                rest: 60,
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
                        workout: [
                            {
                                title: "Bench Press",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Incline Flyes",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Piston Press",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Hammer Press",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Push-ups",
                                duration: "",
                                sets: 5,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Decline Bench Press",
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
                        workout: [
                            {
                                title: "Weighted Squats",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "120 seconds",
                                completed: false
                            },
                            {
                                title: "Weighted Lunges",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "120 seconds",
                                completed: false
                            },
                            {
                                title: "Weighted Calf Raises",
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
                        workout: [
                            {
                                title: "Bench Decline Sit-ups",
                                duration: "",
                                sets: 4,
                                reps: 10,
                                rest: "60 seconds",
                                completed: false
                            },
                            {
                                title: "Cable Wood-chop (Downward)",
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