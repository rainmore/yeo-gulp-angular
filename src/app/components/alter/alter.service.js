(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('alertService', alertService);

  /** @ngInject */
  function alertService($alert)  {
    var self = this;

    var alerts = [];

    var handler = function(message, title, type) {
      var alert = $alert({
        'title':     title,
        'content':   message,
        'type':      type,
        'duration':  3,
        'container': '#alerts-container'
      });
      alert.$promise.then(alert.show);
      alerts.push(alert);
      return self;
    };

    this.info = function(message, title) {
      return handler(message, title, 'info');
    };

    this.success = function(message, title) {
      return handler(message, title, 'success');
    };

    this.warn = function(message, title) {
      return handler(message, title, 'warning');
    };

    this.error = function(message, title) {
      return handler(message, title, 'danger');
    };

    this.close = function() {
      if (alerts.length > 0) {
        alerts.forEach(function(alert) {
          alert.$promise.then(alert.hide);
        });
        alerts = [];
      }
      return self;
    };


    // helpers
    this.saved = function(isNew) {
      if (isNew) {
        return self.added();
      }
      return self.updated();
    };

    this.updated = function() {
      return self.success('Updated Successfully');
    };

    this.added = function() {
      return self.success('Added Successfully');
    };
  }

})();
