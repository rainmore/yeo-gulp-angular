(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('ServerEditController', ServerEditController);

  /** @ngInject */
  function ServerEditController($stateParams, alertService, serversService, tenantsService) {
    var vm = this;

    vm.data    = null;
    vm.origin  = null;
    vm.servers = [];


    function init() {
      vm.isLoading = true;


      serversService.findAll().then(function(result) {
        vm.servers = result.data;
      });

      if ($stateParams.id === undefined) {
        tenantsService.getEmpty().then(function(result) {
          vm.data = result.data;
          vm.origin = angular.copy(vm.data);
          vm.isLoading = false;
        });
      }
      else {
        tenantsService.findOne($stateParams.id).then(function (result) {
          vm.data = result.data;
          vm.origin = angular.copy(vm.data);
          vm.isLoading = false;
        });
      }
    }

    init();

    vm.save = function(data) {
      var isNew = data.id === null;
      serversService.save(data).then(function(result) {
        vm.data = result.item;
        vm.origin = angular.copy(vm.data);
        alertService.close().saved(isNew);
      });
    };


    vm.reset = function() {
      vm.data = angular.copy(vm.origin);
      alertService.close();
    };

  }
})();
