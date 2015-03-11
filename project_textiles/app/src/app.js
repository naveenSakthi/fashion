var myapp = angular.module('myapp', ["ui.router"])
    myapp.config(function($stateProvider){
    $stateProvider
        .state('index', {
            url: "/",
            templateUrl: 'src/views/home.tpl.html',
        })
        .state('category', {
            url: "/category",
            templateUrl: 'src/views/category.tpl.html',
        })
         .state('shops', {
            url: "/shops",
            templateUrl: 'src/views/fashion-shops.tpl.html',
        })
         .state('multi', {
            url: "/multi",
            templateUrl: 'src/views/multi-column.html',
        })
        
    })