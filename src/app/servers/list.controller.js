(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('ServersListController', ServersListController);

  /** @ngInject */
  function ServersListController($timeout, serversService, alertService) {
    var vm = this;

    vm.servers = [];

    vm.activate = function(data) {
      data.active = !data.active;
      serversService.save(data).then(function() {
        alertService.updated();
      });
    };

    vm.getPage = function (tableState) {
      vm.isLoading = true;
      var pagination = tableState.pagination;

      var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      var number = pagination.number || 10;  // Number of entries showed per page.

      serversService.getPage(start, number, tableState).then(function (result) {
        vm.servers = result.data;
        tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
        vm.isLoading = false;
      });
    };
  }
})();
