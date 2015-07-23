(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('serversService', serversService);

  /** @ngInject */
  function serversService($q, $filter, $timeout, clustersService, loremIpsumService)  {
    var roles = ["Application", "Chancellor", "Database", "Steward"];
  	var data = [];

    var random = function(id) {
      var name = loremIpsumService.randomItemFromArray(['AU', 'US', 'EU', 'ASIA']);
    	name += loremIpsumService.randomItemFromArray([1, 2, 3, 4, 5]);
    	var role = loremIpsumService.randomItemFromArray(roles);

      return {
        'id': id,
        'active': loremIpsumService.randomBoolean(),
        'name': name,
        'role': role,
        'ip': name,
        'type': 'EC2',
         'az': loremIpsumService.randomItemFromArray(['a', 'b']),
        'createdDate': new Date()
      };
    };

    for (var i = 1; i <= 10; i++) {
      data.push(random(i));
    }

    this.getEmpty = function() {
		return {
        'id': null,
        'active': true,
        'name': null,
        'role': null,
        'ip': null,
        'type': null,
        'az': 'a',
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
