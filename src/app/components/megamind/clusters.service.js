(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('clustersService', clustersService);

  /** @ngInject */
  function clustersService($q, $filter, $timeout, storageService)  {
    var data = [];
    var zones = ["ap-southeast-1", "ap-southeast-2", "eu-central-1", "us-west-1"];

    var random = function(zone, id) {
      var name = zone.substring(0, 5).toUpperCase();

      return {
        'id': id,
        'name': name,
        'zone': zone,
        'createdDate': new Date()
      };
    };

    for (var i = 0; i < zones.length; i++) {
      data.push(random(zones[i], i + 1));
    }

    this.save = function(cluster) {
      return storageService.save(cluster, data);
    };

    this.getZones = function() {
      return storageService.fakeDeffer(zones);
    };

    this.getEmpty = function() {
      var cluster = {
        'id': null,
        'name': null,
        'zone': null,
        'createdDate': new Date()
      };

      return storageService.fakeDeffer(cluster);
    };

    this.findOne = function(id) {
      return storageService.findOne(id, data);
    };

    this.findAll = function() {
      return storageService.findAll(data);
    };

    this.all = function() {
      return data;
    };

    this.getPage = function (start, number, params) {
      return storageService.findPage(start, number, params, data);
    };
  }

})();
