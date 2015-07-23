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
        'container': '#alerts-container'
      });
      alert.$promise.then(alert.show);
      alerts.push(alert);
    };

    this.info = function(message, title) {
      handler(message, title, 'info');
    };

    this.success = function(message, title) {
      handler(message, title, 'success');
    };

    this.warn = function(message, title) {
      handler(message, title, 'warning');
    };

    this.error = function(message, title) {
      handler(message, title, 'danger');
    };

    this.close = function() {
      if (alerts.length > 0) {
        alerts.forEach(function(alert) {
          alert.$promise.then(alert.hide);
        });
        alerts = [];
      }
    };


    // helpers
    this.saved = function(isNew) {
      if (isNew) {
        self.added();
      }
      else {
        self.updated();
      }
    };

    this.updated = function() {
      self.success('Updated Successfully');
    };

    this.added = function() {
      self.success('Added Successfully');
    };
  }

})();
