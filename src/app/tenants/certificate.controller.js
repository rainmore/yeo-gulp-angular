(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('TenantsCertificateController', TenantsCertificateController);

  /** @ngInject */
  function TenantsCertificateController($stateParams, $timeout, tenantsService) {
    var vm = this;

    vm.tenant = null;

    activate();

    function activate() {
      getTenant();
    }

    function getTenant() {
      vm.isLoading = true;
      tenantsService.findOne($stateParams.id).then(function (result) {
        vm.tenant = result.data;
        vm.isLoading = false;
      });
    }

  }
})();
