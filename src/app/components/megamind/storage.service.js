(function() {
  'use strict';

  angular
    .module('webupdateNg')
    .service('storageService', storageService);

  /** @ngInject */
  function storageService($q, $filter, $timeout)  {
    var self = this;

    /**
     * mock on
     * @param item
     * @param lists
     * @returns {*}
     */
    this.findById = function(id, lists) {
      var filtered = $filter('filter')(lists, function(item) {
        return item.id === parseInt(id);
      });

      return (filtered.length === 1) ? filtered[0] : null;
    };

    this.findOne = function(id, list) {
      var deferred = $q.defer();

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: self.findById(id, list)
        });
      }, 150);

      return deferred.promise;
    };

    this.findAll = function(list) {
      var deferred = $q.defer();

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: list
        });
      }, 150);

      return deferred.promise;
    };

    this.save = function(item, list) {
      var deferred = $q.defer();

      if (item.id === null) {
        item.id = list.length + 1;
        list.push(item);
      }
      else {
        for(var i = 0; i < list.length; i++) {
          if (list[i].id === item.id) {
            list[i] = item;
            break;
          }
        }
      }

      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          item: item,
          list: list
        });
      }, 150);

      return deferred.promise;
    };

    //fake call to the server, normally this service would serialize table state to send it to the server (with query parameters for example) and parse the response
    //in our case, it actually performs the logic which would happened in the server
    this.findPage = function (start, number, params, data) {

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

    this.fakeDeffer = function (data) {
      var deferred = $q.defer();
      $timeout(function () {
        //note, the server passes the information about the data set size
        deferred.resolve({
          data: data
        });
      }, 150);

      return deferred.promise;
    };
  }

})();
