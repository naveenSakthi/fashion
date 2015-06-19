angular.module('fashionApp').controller('homeController',function($scope,dataFactory,initSearch){
	$scope.initSearch=initSearch;
	dataFactory.get('src/controllers/states.json').then(function(data){
		$scope.items=data;
	});
	dataFactory.get('src/controllers/offers.json').then(function(data){
		$scope.offers=data;
	});
	dataFactory.get('src/controllers/brands.json').then(function(data){
		$scope.brands=data;
	});
	dataFactory.get('src/controllers/categories.json').then(function(data){
		$scope.categories=data;
	});
	dataFactory.get('src/controllers/categories.json').then(function(data){
		$scope.categories=data;
	});
  $scope.currentLocation='chennai';
	$scope.currentTab='offer';
	$scope.switchTab=function(data){
		$scope.currentTab=data;
	};	
});

angular.module('fashionApp').service('initSearch', ['$log',
  function initsearch($log) {
    var self = this;
  
    self.simulateQuery = false;
    self.isDisabled    = false;
    self.searchText='';
    self.selectedItem='';
    self.querySearch =function(query) {
      var results=[];
      angular.forEach(repos, function(item) {
          if (item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
            results.push(item);
          }
        });
      return results;
    };
    self.searchTextChange=function(text) {
      $log.info('Text changed to ' + text);
    };
    self.selectedItemChange=function(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    };
    var repos = [
        {
          'name'      : 'Angular 1',
          'url'       : 'https://github.com/angular/angular.js',
          'watchers'  : '3,623',
          'forks'     : '16,175',
        },
        {
          'name'      : 'Angular 2',
          'url'       : 'https://github.com/angular/angular',
          'watchers'  : '469',
          'forks'     : '760',
        },
        {
          'name'      : 'Angular Material',
          'url'       : 'https://github.com/angular/material',
          'watchers'  : '727',
          'forks'     : '1,241',
        },
        {
          'name'      : 'Bower Material',
          'url'       : 'https://github.com/angular/bower-material',
          'watchers'  : '42',
          'forks'     : '84',
        },
        {
          'name'      : 'Material Start',
          'url'       : 'https://github.com/angular/material-start',
          'watchers'  : '81',
          'forks'     : '303',
        }
      ];  
  }
]);


angular.module('fashionApp').factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data;
      });
    }
  };
});