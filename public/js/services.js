"use strict";

var NAMESPACE = 'com.luiseduardobrito.playlistcast';

var playlistServices = angular.module("playlistApp.services", []);

playlistServices.factory("$cast", [
  '$http',
  function($http) {

    var _this = this;
    var _public = {};

    _this.observers = {};

    _this.init = function(){
      jQuery(window).ready(function(){
        _this.registerReceiver()
      });
    };

    _this.registerReceiver = function(){

      console.log("cast> registering receiver...");

      /**
       * Application config
       **/
      var appConfig = new cast.receiver.CastReceiverManager.Config();

      _this.mediaElement = document.getElementById('media');
      _this.mediaManager = new cast.receiver.MediaManager(_this.mediaElement);
      _this.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

      /**
       * Text that represents the application status. It should meet
       * internationalization rules as may be displayed by the sender application.
       * @type {string|undefined}
       **/
      appConfig.statusText = 'Ready to play';

      /**
       * Maximum time in seconds before closing an idle
       * sender connection. Setting this value enables a heartbeat message to keep
       * the connection alive. Used to detect unresponsive senders faster than
       * typical TCP timeouts. The minimum value is 5 seconds, there is no upper
       * bound enforced but practically it's minutes before platform TCP timeouts
       * come into play. Default value is 10 seconds.
       * @type {number|undefined}
       **/
      // 100 minutes for testing, use default 10sec in prod by not setting this value
      appConfig.maxInactivity = 6000;

      /**
      * Custom Message Bus for message handling
      */
      var customMessageBus = _this.castReceiverManager.getCastMessageBus('urn:x-cast:super.awesome.example');
      customMessageBus.onMessage = _this.notifyMessageReceiver;

      /**
       * Initializes the system manager. The application should call this method when
       * it is ready to start receiving messages, typically after registering
       * to listen for the events it is interested on.
       */
      _this.castReceiverManager.start(appConfig);
      console.log("cast> media receiver registered!");
    };

    _this.notifyMessageReceiver = function(event) {

      var observers = _this.observers["message"] || [];

      for(var i = 0; i < observers.length; i++) {
        observers(event);
      }
    }

    _public.onMessageReceived = function(fn) {
      _this.observers["message"] = _this.observers["message"] || [];
      _this.observers["message"].push(fn);
    }

    return _this.init();
  }
]);