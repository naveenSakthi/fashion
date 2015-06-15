var fashionApp = angular.module('fashionApp', ['ui.router','ui.bootstrap','pageslide-directive'])
    fashionApp.config(function($stateProvider){
    $stateProvider
        .state('home', {
            url: "",
            templateUrl: 'src/views/home.tpl.html',
            controller:'homeController'
        })
        .state('categories', {
            url: "/categories",
            templateUrl: 'src/views/category-list.tpl.html',
        })
         .state('shops', {
            url: "/shops",
            templateUrl: 'src/views/shop-list.tpl.html',
        })
         .state('shop-detail', {
            url: "/shop-detail",
            templateUrl: 'src/views/shop-detail.tpl.html',
        })
         .state('user', {
            url: "/user",
            templateUrl: 'src/views/user.tpl.html',
        })
         .state('offers', {
            url: "/offers",
            templateUrl: 'src/views/offer-list.tpl.html',
        })

    })
