(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('ClustersListController', ClustersListController);

  /** @ngInject */
  function ClustersListController($timeout, clustersService) {
    var vm = this;

    vm.clusters = [];

    vm.getPage = function (tableState) {
      vm.isLoading = true;
      var pagination = tableState.pagination;

      var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      var number = pagination.number || 10;  // Number of entries showed per page.

      clustersService.getPage(start, number, tableState).then(function (result) {
        vm.clusters = result.data;
        tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
        vm.isLoading = false;
      });
    };
  }
})();
