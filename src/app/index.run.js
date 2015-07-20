(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
