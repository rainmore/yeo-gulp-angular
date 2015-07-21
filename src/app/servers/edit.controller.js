(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('ServerEditController', ServerEditController);

  /** @ngInject */
  function ServerEditController($stateParams, $timeout, toastr, serversService) {
    var vm = this;

    vm.server = null;

    activate();

    function activate() {
      get();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function get() {
      vm.isLoading = true;
      serversService.findOne($stateParams.id).then(function (result) {
        vm.server = result.data;
        vm.isLoading = false;
      });
    }

  }
})();
