(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('tenantsService', tenantsService);

  /** @ngInject */
  function tenantsService ($q, $filter, $timeout, serversService, loremIpsumService)  {
    var self = this;
    var data = [];

    var random = function(id) {
      var name = 'stage' + loremIpsumService.randomText(5);
      var tag = loremIpsumService.randomItemFromArray(['7.2.0', '7.3.0', '7.4.0', '8.0.0', '8.1.0', '8.2.0']);
      var server = loremIpsumService.randomItemFromArray(serversService.findAll());

      return {
        'id': id,
        'active': loremIpsumService.randomBoolean(),
        'name': name,
        'tenantId': name,
        'directory': name,
        'preferredUrl': null,
        'live': loremIpsumService.randomBoolean(),
        'tag': tag,
        'createdDate': '2015-07-10 11:11:11',
        'rolloutgroup': 'dev',
        'db': {
          'hostname': 'localhost',
          'name': name,
          'user': name,
          'pass': name
        },
        'server': server,
        't2': {
          'active': false,
          'rto': null
        }
      };
    };

    for (var i = 1; i <= 1000; i++) {
      data.push(random(i));
    }

    this.getEmpty = function(server) {
      return {
        'id': null,
        'active': null,
        'name': null,
        'tenantId': null,
        'directory': null,
        'preferredUrl': null,
        'live': null,
        'tag': null,
        'createdDate': new Date(),
        'rolloutgroup': 'dev',
        'db': {
          'hostname': 'localhost',
          'name': null,
          'user': null,
          'pass': null
        },
        'server': server,
        't2': {
          'active': null,
          'rto': null
        }
      };
    };

    this.findAll = function() {
      return data;
    };

    //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
    //in our case, it actually performs the logic which would happened in the server
    this.getPage = function (start, number, params) {

      var deferred = $q.defer();

      var filtered = params.search.predicateObject ? $filter('filter')(data, params.search.predicateObject) : data;

      if (params.sort.predicate) {
        filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
      }

      var result = filtered.slice(start, start + number);

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: result,
          numberOfPages: Math.ceil(data.length / number)
        });
      }, 1000);


      return deferred.promise;
    };

    this.findOne = function(id) {
      var deferred = $q.defer();

      var filtered = $filter('filter')(self.findAll(), function(tenant) {
        return tenant.id === parseInt(id);
      });

      var result = (filtered.length === 1) ? filtered[0] : null;

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: result
        });
      }, 150);

      return deferred.promise;
    };

    this.refresh = function() {
      var deferred = $q.defer();

      console.log('refreshed all');

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: "Well done"
        });
      }, 150);

      return deferred.promise;
    };

    this.refreshById = function(id) {
      var deferred = $q.defer();

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: "Tenant: " + id + " refreshed"
        });
      }, 150);

      return deferred.promise;
    };
  }

})();
