'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('workoutApp')
  .controller('mainCtrl', ['$scope', '$localStorage', 'workouts', '$timeout', function ($scope, $localStorage, workouts, $timeout) {

    $scope.workouts = workouts;
    $localStorage.workoutDays === undefined ? $scope.workoutDays = $scope.workouts : $scope.workoutDays = $localStorage.workoutDays;
    $localStorage.workoutDays = $scope.workoutDays;

    console.log($localStorage.workoutDays);

    $scope.$completed = $localStorage;

    $scope.revert = function() {
        $scope.workoutDays = $scope.workouts;
        $localStorage.workoutDays = $scope.workoutDays;
        init();
    };

    var init = function () {
        var today = new Date();
        var d = today.getDay();
        var currentDay = $scope.workoutDays.days[d];

        for (var i=0; i<=6;i++){
            if (i === d) {
                $scope.workoutDays.days[i].isActive = true;
            } else {
                $scope.workoutDays.days[i].isActive = false;
            }
        }
    };

    init();
  }]);