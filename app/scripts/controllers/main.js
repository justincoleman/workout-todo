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
    var _timeout;

    $scope.setVal = function(source) {
        $scope.workoutDays = source;
    };

    $scope.change = function (item, day, index) {
        if(_timeout){ //if there is already a timeout in process cancel it
            $timeout.cancel(_timeout);
        }

        _timeout = $timeout(function(){
            var counter = $scope.workoutDays.days[day].zones[index].counter;
            if (item.completed === false && counter > 0) {
                $scope.workoutDays.days[day].zones[index].counter = counter - 1;
            } else {
                $scope.workoutDays.days[day].zones[index].counter = counter + 1;
            }
        }, 500);
    };

    $scope.revert = function() {
        $scope.workoutDays = $scope.workouts;
        $localStorage.workoutDays = $scope.workoutDays;
        init();
    };

    var init = function () {
        var today = new Date();
        var d = today.getDay();

        for (var i=0; i<=6;i++){
            if (i === d) {
                $scope.workoutDays.days[i].isActive = true;
            } else {
                $scope.workoutDays.days[i].isActive = false;
            }
        }
    };

    $scope.workouts = workouts;
    $localStorage.workoutDays === undefined ? $scope.setVal($scope.workouts) : $scope.setVal($localStorage.workoutDays);
    $localStorage.workoutDays = $scope.workoutDays;

    init();
  }]);