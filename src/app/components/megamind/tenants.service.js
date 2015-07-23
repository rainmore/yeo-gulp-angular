(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('tenantsService', tenantsService);

  /** @ngInject */
  function tenantsService ($q, $filter, $timeout, storageService, serversService, loremIpsumService)  {
    var servers = [];
    var data = [];

    var random = function(id) {
      var name = 'stage' + loremIpsumService.randomText(5);
      var tag = loremIpsumService.randomItemFromArray(['7.2.0', '7.3.0', '7.4.0', '8.0.0', '8.1.0', '8.2.0']);
      var server = loremIpsumService.randomItemFromArray(servers);

      return {
        'id': id,
        'active': loremIpsumService.randomBoolean(),
        'name': name,
        'tenantId': name,
        'directory': name,
        'preferredUrl': null,
        'live': loremIpsumService.randomBoolean(),
        'tag': tag,
        'createdDate': new Date(),
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

    serversService.findAll().then(function(result) {
      servers = result.data;
    });

    for (var i = 1; i <= 1000; i++) {
      data.push(random(i));
    }

    this.save = function(tenant) {
      return storageService.save(tenant, data);
    };

    this.getEmpty = function() {
      var tenant = {
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
        'server': null,
        't2': {
          'active': null,
          'rto': null
        }
      };

      return storageService.fakeDeffer(tenant);
    };


    this.findOne = function(id) {
      return storageService.findOne(id, data);
    };

    this.findAll = function() {
      return storageService.findAll(data);
    };

    this.getPage = function (start, number, params) {
      return storageService.findPage(start, number, params, data);
    };
  }

})();
