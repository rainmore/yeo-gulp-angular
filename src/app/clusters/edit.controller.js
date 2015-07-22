(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('ClusterEditController', ClusterEditController);

  /** @ngInject */
  function ClusterEditController($stateParams, $timeout, toastr, clustersService) {
    var vm = this;

    vm.cluster = null;
    vm.zones = [];


    activate();

    function activate() {
      get();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function get() {
      vm.isLoading = true;

      clustersService.getZones().then(function (result) {
        vm.zones = result.data;
      });

      clustersService.findOne($stateParams.id).then(function (result) {
        vm.cluster = result.data;
        vm.isLoading = false;
      });
    }

    vm.save = function(clutser) {
      clustersService.save(clutser).then(function(result) {
        vm.clutser = result.item;

        console.log(result.item, result.list);
      });
    };

    vm.reset = function(clutser) {
      
    };

  }
})();
