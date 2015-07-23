(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('ClusterEditController', ClusterEditController);

  /** @ngInject */
  function ClusterEditController($stateParams, $timeout, toastr, clustersService) {
    var vm = this;

    vm.data   = null;
    vm.origin = null;
    vm.zones  = [];

    function init() {
      vm.isLoading = true;

      clustersService.getZones().then(function (result) {
        vm.zones = result.data;
      });

      if ($stateParams.id === undefined) {
        clustersService.getEmpty().then(function (result) {
          vm.data = result.data;
          vm.origin = angular.copy(vm.data);
          vm.isLoading = false;
        });
      }
      else {
        clustersService.findOne($stateParams.id).then(function (result) {
          vm.data = result.data;
          vm.origin = angular.copy(vm.data);
          vm.isLoading = false;
        });
      }
    }

    init();

    vm.save = function(clutser) {
      var isNew = clutser.id === null;
      clustersService.save(clutser).then(function(result) {

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
