'use strict';

angular.module('fashionApp').service('$api', function($http, $q) {

  if (!$http.defaults.headers.get) {
    $http.defaults.headers.get = {};
  }
  // disable IE ajax request caching
  $http.defaults.headers.get['If-Modified-Since'] = '0';

  var $api = function(endPoint) {
    var _endpointUrl = baseUrl + endPoint;

    this.list = function() {
      return $http.get(_endpointUrl ,{cache:false});
    };

    this.get = function(id) {
      return $http.get(_endpointUrl + '/' + id, {cache:false});
    };

    this.save = function(object,id) {
      if (!!id) {
        return $http.put(_endpointUrl + '/' + id, object,{cache:false});
      } else {
        return $http.post(_endpointUrl, object);
      }
    };
  };
  return $api;
});

