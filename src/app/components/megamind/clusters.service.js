(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('clustersService', clustersService);

  /** @ngInject */
  function clustersService($q, $filter, $timeout, storageService)  {
    var self = this;
    var data = [];
    var zones = ["ap-southeast-1", "ap-southeast-2", "eu-central-1", "us-west-1"];

    var random = function(zone, id) {
      var name = zone.substring(0, 5).toUpperCase();

      return {
        'id': id,
        'name': name,
        'zone': zone,
        'createdDate': new Date()
      }
    };

    for (var i = 0; i < zones.length; i++) {
      data.push(random(zones[i], i + 1));
    }

    this.save = function(cluster) {
      return storageService.save(cluster, data);
    };

    this.getZones = function() {
      var deferred = $q.defer();
      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: zones
        });
      }, 150);

      return deferred.promise;
    };

    this.getEmpty = function() {
      return {
        'id': null,
        'name': null,
        'zone': null,
        'createdDate': new Date()
      };
    };

    this.findOne = function(id) {
      var deferred = $q.defer();

      var filtered = $filter('filter')(data, function(item) {
        return item.id === parseInt(id);
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
  }

})();
