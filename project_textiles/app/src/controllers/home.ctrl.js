angular.module('fashionApp').controller('homeController',function($scope,dataFactory){
	dataFactory.get('src/controllers/states.json').then(function(data){
		$scope.items=data;
	});

	$scope.name="";
	$scope.onItemSelected=function(){
		console.log('selected='+$scope.name);
	};
	$scope.currentTab='offer';
	$scope.switchTab=function(data){
		$scope.currentTab=data;
	};	
});

angular.module('fashionApp').directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
		items: '=',
		prompt:'@',
		title: '@',
		subtitle:'@',
		model: '=',
		onSelect:'&'
	},
	link:function(scope,elem,attrs){
	   scope.handleSelection=function(selectedItem){
		 scope.model=selectedItem;
		 scope.current=0;
		 scope.selected=true;        
		 $timeout(function(){
			 scope.onSelect();
		  },200);
	  };
	  scope.current=0;
	  scope.selected=true;
	  scope.isCurrent=function(index){
		 return scope.current==index;
	  };
	  scope.setCurrent=function(index){
		 scope.current=index;
	  };
	},
    templateUrl: 'src/controllers/templateurl.html'
  }
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