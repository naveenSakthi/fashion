angular.module('fashionApp').controller('homeController',function($scope,dataFactory){
	dataFactory.get('src/controllers/search.json').then(function(data){
		$scope.searchData=data;
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
	dataFactory.get('src/controllers/populars.json').then(function(data){
		$scope.populars=data;
	});
	dataFactory.get('src/controllers/latestUpdates.json').then(function(data){
		$scope.updates=data;
	});


	var commonData={
	    users:300,
	    shops:300,
	    articals:200,
	    press:'Ultimate work from the guys. Which will be a landmark....Explore the trend from here..'
	};
	$scope.appDetails=commonData;
	$scope.currentTab='offer';
	$scope.switchTab=function(data){
		$scope.currentTab=data;
	};	
});



angular.module('fashionApp').factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data;
      });
    }
  };
});