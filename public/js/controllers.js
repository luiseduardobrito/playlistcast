var playlistControllers = angular.module("playlistApp.controllers", []);

playlistControllers.controller("HomeCtrl",
    [
      '$scope', '$cast',
      function($scope, $cast) {
        $scope.title = "PlaylistCast";
        $scope.description = "Please, connect using the PlaylistCast app. <br> Available for iOS, Android or Chrome";
        $scope.status = "Waiting for devices...";
      }

    ]);