(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('TenantsListController', TenantsListController);

  /** @ngInject */
  function TenantsListController($timeout, alertService, tenantsService) {
    var vm = this;

    vm.tenants = [];

    vm.activate = function(data) {
      data.active = !data.active;
      var isNew = data.id === null;
      tenantsService.save(data).then(function(result) {
        vm.tenants = result.data;
        alertService.success((isNew) ? "Added Successfully!" : "Updated Successfully!");
        alertService.success((isNew) ? "Added Successfully!" : "Updated Successfully!");
      });
    };

    vm.callServer = function (tableState) {
      vm.isLoading = true;
      var pagination = tableState.pagination;

      var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      var number = pagination.number || 10;  // Number of entries showed per page.

      tenantsService.getPage(start, number, tableState).then(function (result) {
        vm.tenants = result.data;
        tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
        vm.isLoading = false;
      });
    };
  }
})();
