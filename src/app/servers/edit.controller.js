(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('ServerEditController', ServerEditController);

  /** @ngInject */
  function ServerEditController($stateParams, alertService, serversService, clustersService) {
    var vm = this;

    vm.data     = null;
    vm.origin   = null;
    vm.clusters = [];
    vm.zones    = [];

    function init() {
      vm.isLoading = true;

      serversService.getZones().then(function(result) {
        vm.zones = result.data;
      });

      clustersService.findAll().then(function(result) {
        vm.clusters = result.data;
      });

      if ($stateParams.id === undefined) {
        serversService.getEmpty().then(function(result) {
          vm.data = result.data;
          vm.origin = angular.copy(vm.data);
          vm.isLoading = false;
        });
      }
      else {
        serversService.findOne($stateParams.id).then(function (result) {
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
