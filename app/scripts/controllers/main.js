'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('workoutApp')
  .controller('mainCtrl', function ($scope, $localStorage, workouts, $timeout) {

    $scope.workouts = workouts;
    $localStorage.workoutDays === "" ? $scope.workoutDays = $scope.workouts : $scope.workoutDays = $localStorage.workoutDays;

    $scope.$completed = $localStorage;

    $scope.isActive = false;

    $scope.revert = function() {
        $scope.workoutDays = $scope.workouts;
        $localStorage.workoutDays = $scope.workoutDays;
        init();
    };

    var init = function () {
        var today = new Date();
        var d = today.getDay();
        var currentDay = $scope.workoutDays.days[d];

        if (d === currentDay.id) {
            console.log(1);
            $scope.workoutDays.days[d].isActive = true;
        } else {
            console.log(2);
            $scope.workoutDays.days.isActive = false;
        }
    };

    init();
  });
