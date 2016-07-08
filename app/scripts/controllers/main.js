'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
app.controller('mainCtrl', ['$scope', '$localStorage', 'workouts', '$timeout', function ($scope, $localStorage, workouts, $timeout) {
    var _timeout;
    var today = new Date();
    var d = today.getDay();

    $scope.setActiveDay = function(d) {
        for (var i=0; i<=6;i++){
            if (i === d) {
                $scope.workoutDays.days[i].isActive = true;
            } else {
                $scope.workoutDays.days[i].isActive = false;
            }
        }
    };

    $scope.revertWeek = function() {
        $scope.workoutDays = $scope.workouts;
        $localStorage.workoutDays = $scope.workoutDays;
    };

    $scope.setVal = function(source) {
        $scope.workoutDays = source;
    };

    $scope.change = function (item, day, index) {
        if(_timeout){
            $timeout.cancel(_timeout);
        }

        _timeout = $timeout(function(){
            var max = $scope.workoutDays.days[day].zones[index].workout.length;
            var counter = $scope.workoutDays.days[day].zones[index].counter;
            var counterNum = 0;

            for (var i = 0; i < max; i++) {
                var status = $scope.workoutDays.days[day].zones[index].workout[i].completed;

                if (status === true) {
                    counterNum += 1;
                }

                $scope.workoutDays.days[day].zones[index].counter = counterNum;
            }
        }, 200);
    };

    $scope.setActiveNav = function(event) {
        $('.btn-group').children().removeClass('active');
        $(event.target).addClass('active');
    };

    $scope.revertBtn = function() {
        $scope.workoutDays = $scope.workouts;
        $localStorage.workoutDays = $scope.workoutDays;
        $scope.setActiveDay(d);
    };

    $scope.workouts = workouts;
    $localStorage.workoutDays === undefined ? $scope.setVal($scope.workouts) : $scope.setVal($localStorage.workoutDays);
    $localStorage.workoutDays = $scope.workoutDays;

    $scope.setActiveDay(d);
  }]);
