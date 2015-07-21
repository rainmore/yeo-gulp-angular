(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('TenantsCertificateController', TenantsCertificateController);

  /** @ngInject */
  function TenantsCertificateController($stateParams, $timeout, webDevTec, toastr, megamind) {
    var vm = this;

    vm.tenant = null;

    activate();

    function activate() {
      getTenant();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getTenant() {
      vm.isLoading = true;
      megamind.getTenantById($stateParams.id).then(function (result) {
        vm.tenant = result.data;
        vm.isLoading = false;
      });
    }

  }
})(console);
