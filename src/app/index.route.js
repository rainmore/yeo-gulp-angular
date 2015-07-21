(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/home.html',
        controller: 'HomeController',
        controllerAs: 'ctrl',
        ncyBreadcrumb: {
          label: 'Home'
        }
      })
      .state('servers', {
        url: '/servers',
        templateUrl: 'app/servers/list.html',
        controller: 'ServersListController',
        controllerAs: 'ctrl',
        ncyBreadcrumb: {
          label: 'Servers'
        }
      })
      .state('serversEdit', {
        url: '/servers/{id:int}',
        templateUrl: 'app/servers/edit.html',
        controller: 'ServerEditController',
        controllerAs: 'ctrl',
        ncyBreadcrumb: {
          parent: 'servers',
          label: 'Edit Server'
        }
      })
      .state('tenants', {
        url: '/tenants',
        templateUrl: 'app/tenants/list.html',
        controller: 'TenantsListController',
        controllerAs: 'ctrl',
        ncyBreadcrumb: {
          label: 'Tenants'
        }
      })
      .state('tenantsView', {
       url: '/tenants/{id:int}',
       controller: 'TenantsViewController',
       controllerAs: 'ctrl',
        ncyBreadcrumb: {
          parent: 'tenants',
          label: 'View Tenant'
        }
      })
      .state('tenantsCertificate', {
        url: '/tenants/{id:int}/certificate',
        templateUrl: 'app/tenants/certificate.html',
        controller: 'TenantsCertificateController',
        controllerAs: 'ctrl',
        ncyBreadcrumb: {
          parent: 'tenants',
          label: 'Edit Certificate'
        }
      })
    ;

    $urlRouterProvider.otherwise('/home');
  }

})();
