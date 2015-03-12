var fashionApp = angular.module('fashionApp', ["ui.router"])
    fashionApp.config(function($stateProvider){
    $stateProvider
        .state('main', {
            url: "",
            templateUrl: 'src/views/main.tpl.html',
        })
        .state('main.index', {
            url: "/",
            templateUrl: 'src/views/home.tpl.html',
        })
        .state('main.category', {
            url: "/category",
            templateUrl: 'src/views/category.tpl.html',
        })
         .state('main.shops', {
            url: "/shops",
            templateUrl: 'src/views/shops.tpl.html',
        })
         .state('main.shop-detail', {
            url: "/shop-detail",
            templateUrl: 'src/views/shop-detail.tpl.html',
        })
        
    })