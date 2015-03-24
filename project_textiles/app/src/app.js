var fashionApp = angular.module('fashionApp', ["ui.router"])
    fashionApp.config(function($stateProvider){
    $stateProvider
        .state('main', {
            url: "",
            templateUrl: 'src/views/main.tpl.html',
        })
        .state('main.home', {
            url: "/",
            templateUrl: 'src/views/home.tpl.html',
        })
        .state('category', {
            url: "/category",
            templateUrl: 'src/views/category.tpl.html',
        })
         .state('shops', {
            url: "/shops",
            templateUrl: 'src/views/shops.tpl.html',
        })
         .state('main.shop-detail', {
            url: "/shop-detail",
            templateUrl: 'src/views/shop-detail.tpl.html',
        })
         .state('main.user', {
            url: "/user",
            templateUrl: 'src/views/user.tpl.html',
        })
         .state('main.offers', {
            url: "/offers",
            templateUrl: 'src/views/offers.tpl.html',
        })

        
    })