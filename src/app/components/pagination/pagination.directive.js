(function() {
  'use strict';

  angular.module('webupdateNg')
    .directive('pageSelect', pageSelect);

  function pageSelect() {
    var directive = {
      restrict: 'E',
      template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
      link: linkFunc
    };

    function linkFunc(scope) {
      scope.$watch('currentPage', function(c) {
        scope.inputPage = c;
      });
    }

    return directive;
  }

})();
