(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    console.log($stateProvider);
    console.log($urlRouterProvider);
    $stateProvider
      .state('home', {
        url: '/tenants',
        templateUrl: 'app/tenants/list.html',
        controller: 'TenantsListController',
        controllerAs: 'ctrl'
      })
      .state('edit', {
        url: '/tenants/{id:int}/certificate',
        templateUrl: 'app/tenants/certificate.html',
        controller: 'TenantsCertificateController',
        controllerAs: 'ctrl'
      })
      //.state('view', {
      //  url: '/view/{id}',
      //  templateUrl: 'app/main/view.html',
      //  controller: 'ViewController',
      //  controllerAs: 'main'
      //});
    ;

    $urlRouterProvider.otherwise('/tenants');
  }

})(console);
