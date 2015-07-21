(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, $breadcrumbProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    // Enable breadcrumb
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home'
    });
  }

})();
