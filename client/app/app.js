'use strict';

angular.module('testProjectApp', [
  'testProjectApp.auth',
  'testProjectApp.admin',
  'testProjectApp.users',
  'testProjectApp.records',
  'testProjectApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
