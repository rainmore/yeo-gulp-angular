(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .controller('TenantsListController', TenantsListController);

  /** @ngInject */
  function TenantsListController($timeout, webDevTec, toastr, megamind) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1437434702412;
    vm.showToastr = showToastr;

    vm.displayed = [];

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }

    vm.callServer = function (tableState) {
      vm.isLoading = true;
      var pagination = tableState.pagination;

      var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
      var number = pagination.number || 10;  // Number of entries showed per page.

      megamind.getPage(start, number, tableState).then(function (result) {
        vm.displayed = result.data;
        tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
        vm.isLoading = false;
      });
    };
  }
})();
