(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('serversService', serversService);

  /** @ngInject */
  function serversService($q, $filter, $timeout, storageService, clustersService, loremIpsumService)  {
    var roles = ["Application", "Chancellor", "Database", "Steward"];
  	var data = [];
    var clusters = [];

    var random = function(id) {
      var name = loremIpsumService.randomItemFromArray(['AU', 'US', 'EU', 'ASIA']);
    	name += loremIpsumService.randomItemFromArray([1, 2, 3, 4, 5]);
    	var role = loremIpsumService.randomItemFromArray(roles);

      return {
        'id': id,
        'cluster': loremIpsumService.randomItemFromArray(clusters),
        'active': loremIpsumService.randomBoolean(),
        'name': name,
        'role': role,
        'ip': name,
        'type': 'EC2',
         'az': loremIpsumService.randomItemFromArray(['a', 'b']),
        'createdDate': new Date()
      };
    };

    clustersService.findAll().then(function(result) {
      clusters = result.data;
    });

    for (var i = 1; i <= 10; i++) {
      data.push(random(i));
    }

    this.getZones = function() {
      return storageService.fakeDeffer(roles);
    };

    this.save = function(server) {
      return storageService.save(server, data);
    };

    this.getEmpty = function() {
      var server = {
        'id': null,
        'cluster': null,
        'active': true,
        'name': null,
        'role': null,
        'ip': null,
        'type': null,
        'az': 'a',
        'createdDate': new Date()
      };

      return storageService.fakeDeffer(server);
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
