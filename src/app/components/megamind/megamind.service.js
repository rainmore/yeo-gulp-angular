(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('megamind', megamind);

  /** @ngInject */
  function megamind ($q, $filter, $timeout)  {

    var randomItemFromArray = function(data) {
      return data[Math.floor(Math.random() * data.length)];
    };

    var randomBoolean = function() {
      return randomItemFromArray([true, false]);
    };

    var randomText = function (length) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < length; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    };

    var tag = function () {
      return randomItemFromArray(['7.2.0', '7.3.0', '7.4.0', '8.0.0', '8.1.0', '8.2.0']);
    };

    var random = function(id) {
      var name = 'stage' + randomText(5);

      return {
        'id': id,
        'active': randomBoolean(),
        'name': name,
        'tenantId': name,
        'directory': name,
        'preferredUrl': null,
        'live': randomBoolean(),
        'tag': tag(),
        'createdDate': '2015-07-10 11:11:11',
        'rolloutgroup': 'dev',
        'db': {
          'hostname': 'localhost',
          'name': name,
          'user': name,
          'pass': name
        },
        'server': {
          'name': 'stage72',
          'ip': null
        },
        't2': {
          'active': false,
          'rto': null
        }
      };
    };

    var randomsItems = [];

    for (var i = 1; i <= 1000; i++) {
      randomsItems.push(random(i));
    }

    //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
    //in our case, it actually performs the logic which would happened in the server
    this.getPage = function (start, number, params) {

      var deferred = $q.defer();

      var filtered = params.search.predicateObject ? $filter('filter')(randomsItems, params.search.predicateObject) : randomsItems;

      if (params.sort.predicate) {
        filtered = $filter('orderBy')(filtered, params.sort.predicate, params.sort.reverse);
      }

      var result = filtered.slice(start, start + number);

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: result,
          numberOfPages: Math.ceil(1000 / number)
        });
      }, 1500);


      return deferred.promise;
    };

    this.getTenantById = function(id) {
      var deferred = $q.defer();

      var filtered = $filter('filter')(randomsItems, function(tenant) {
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
  }

})();
