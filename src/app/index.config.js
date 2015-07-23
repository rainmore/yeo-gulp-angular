(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .config(config);

  /** @ngInject */
  function config($logProvider, $breadcrumbProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Enable breadcrumb
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home'
    });
  }

})();
