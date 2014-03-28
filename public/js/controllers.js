var playlistControllers = angular.module("playlistApp.controllers", []);

playlistControllers.controller("HomeCtrl",
    [
      '$scope', '$cast',
      function($scope, $cast) {

      	// Prepare safe apply for cast callback
      	$scope.$safeApply = function(fn) {

			var phase = this.$root.$$phase;
			if(phase == '$apply' || phase == '$digest') {
				if(fn && (typeof(fn) === 'function')) {
					fn();
				}
			} else {
				this.$apply(fn);
			}
		};

		// Prepare cast callback when ready
        $cast.on("ready", function(){

        	$scope.$safeApply(function(scope) {

        		// Prepare UI
        		$scope.title = "PlaylistCast";
        		$scope.description = "Please, connect using the PlaylistCast app. <br> Available for iOS, Android or Chrome";
        		$scope.status = "Waiting for devices...";
        	})
        })

        setTimeout(function(){

        	$scope.$safeApply(function(scope) {
        		$scope.status = "Device connected, preparing playlist..."
        	});

        }, 2000)

        // Register cast receiver
        jQuery(window).ready(function(){
        	$cast.registerReceiver("media");
      	})
      }

    ]);