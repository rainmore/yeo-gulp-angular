(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('loremIpsumService', loremIpsumService);

  /** @ngInject */
  function loremIpsumService()  {
  	var self = this;

  	this.randomText = function(length) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < length; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    };

    this.randomItemFromArray = function(data) {
      if (data === null || data.length === 0) {
        return null;
      }
      return data[Math.floor(Math.random() * data.length)];
    };

    this.randomBoolean = function() {
      return self.randomItemFromArray([true, false]);
    };
  }

})();
