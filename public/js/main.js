
/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('playlistApp', [
      'ngRoute',
      'playlistApp.controllers',
      'playlistApp.services'
    ])

    .config(function ($routeProvider) {
      'use strict';

      $routeProvider

          .when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'views/home.html'
          })

          .otherwise({
            redirectTo: '/'
          });
    });