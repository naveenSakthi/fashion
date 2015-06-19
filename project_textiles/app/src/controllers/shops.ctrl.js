fashionApp.controller('shopController',function($scope,dataFactory,$sce){
	dataFactory.get('src/data/filters.json').then(function(data){
		$scope.filters=data.filters;
	});
	dataFactory.get('src/data/shops.json').then(function(data){
		$scope.shops=data.shops;
	});
	$scope.trustedHtml = function (plainText) {
        return $sce.trustAsHtml(plainText);
    }
    $scope.checkLoginAndRateThisShop = function (shopIndex) {
    	//TODO: allow to change the rating only if the user is logged in . Else revert back to old value itself.
    };
    $scope.onScroll = function (isAtEnd) {
		alert('page scrolled: ' + isAtEnd);
    };
});

fashionApp.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data;
      });
    }
  };
});
