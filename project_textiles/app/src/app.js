var myapp = angular.module('myapp', ["ui.router","ui.select2"])
    myapp.config(function($stateProvider){
    $stateProvider
        .state('index', {
            url: "/",
            templateUrl: 'src/views/home.tpl.html',
        })
        
    })