'use strict';

/**
 * @ngdoc overview
 * @name workoutApp
 * @description
 * # workout tracking application
 *
 * Main module of the application.
 */

var app = angular.module('workoutApp', ['ngAnimate','ngCookies','ngResource','ngRoute','ngSanitize','ngTouch','ngStorage']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
