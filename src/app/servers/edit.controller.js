(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('ServerEditController', ServerEditController);

  /** @ngInject */
  function ServerEditController($stateParams, toastr, serversService, clustersService) {
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
      console.log(data);
      serversService.save(data).then(function(result) {

        vm.data = result.item;
        vm.origin = angular.copy(vm.data);
        toastr.success((isNew) ? "Added Successfully!" : "Updated Successfully!");
      });
    };

    vm.reset = function() {
      vm.data = angular.copy(vm.origin);
    };

  }
})();
