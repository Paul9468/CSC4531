var myApp = angular.module('myApp', ['ui.router']);


myApp.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'home/home.html'
        })

        .state('page2', {
            url: '/page2',
            templateUrl: 'page2/page2.html'
        })

        .state('page3', {
            url: '/page3',
            templateUrl: 'page3/page3.html'
        })

        .state('autocomplete', {
            url: '/autocomplete',
            templateUrl: 'autocomplete/autocomplete.html'
        });

    $urlRouterProvider.otherwise('home');

});
