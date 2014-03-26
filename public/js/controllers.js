var playlistControllers = angular.module("playlistApp.controllers", []);

playlistControllers.controller("HomeCtrl",
    [
      '$scope', '$cast',
      function($scope, $cast) {
        $scope.title = "Waiting for clients...";
        $scope.description = "Please, connect using the PlaylistCast app or Chrome extension.";
      }

    ]);