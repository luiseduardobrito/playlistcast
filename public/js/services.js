"use strict";

var playlistServices = angular.module("playlistApp.services", []);

playlistServices.factory("$cast", [
  '$http',
  function($http) {

    var _this = this;
    var _public = {};

    _this.init = function(){
      jQuery(window).ready(_this.registerReceiver);
    };

    _this.registerReceiver = function(){

      console.log("cast> registering receiver...");

      _this.mediaElement = document.getElementById('media');
      _this.mediaManager = new cast.receiver.MediaManager(_this.mediaElement);

      _this.mediaElement.autoplay = true;

      _this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
      _this.castReceiverManager.onSenderDisconnected = function (event) {
        console.log("cast> sender disconnected");
      };

      _this.castReceiverManager.start({maxInactivity: 600});
      console.log("cast> media receiver registered!");
    };

    return _this.init();
  }
]);