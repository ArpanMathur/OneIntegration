/**
 * Created by spatialx on 8/23/15.
 */
var thinkerApp = angular.module('centerMesh', [
    'ui.bootstrap',
    'ui.layout',
    'ui.router',
    'md.data.table',
    'ngCookies',
    'ngRoute',
    'angular-loading-bar',
    'ngAnimate',
    'ngMaterial',
    'centerMesh.serviceFactories',
    'centerMesh.thinkerServices',
    'centerMesh.primaryControllers',
    'centerMesh.thinkerDirectives'
]);

thinkerApp.config([ '$routeProvider', 'cfpLoadingBarProvider','$stateProvider','$urlRouterProvider','$locationProvider','$mdThemingProvider',
    function($routeProvider, cfpLoadingBarProvider,$stateProvider,$urlRouterProvider,$locationProvider,$mdThemingProvider){
        $locationProvider
            .html5Mode(true)
            .hashPrefix("");

        cfpLoadingBarProvider
            .includeSpinner = false;

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('shell',{
                url:'',
                templateUrl:'/apps/quantum/shell'
            })
            .state('mesh',{
                url:'',
                templateUrl:'/apps/quantum/mesh'
            })
            .state('shell.login',{
                url:'/login',
                templateUrl:'/apps/quantum/login',
                controller:'QuantumSignUpCtr'
            })
            .state('mesh.accounts',{
                url:'/accounts',
                templateUrl: '/apps/quantum/accounts',
                controller:'AccountsCTRL'
            })
            .state('mesh.accounts.dashboard',{
                url:'/dashboard',
                templateUrl: '/apps/quantum/dashboard',
                controller:'DashboardCTRL'
            })
            .state('mesh.accounts.profile',{
                url:'/profile',
                templateUrl: '/apps/quantum/tables',
                controller:'ProfileCTRL'
            });


        $routeProvider
            .when('/apps/quantum/login',{
                controller:'QuantumSignUpCtr'
            })
            .when('/apps/quantum/accounts',{
                controller:'AccountsCTRL'
            })
            .when('/apps/quantum/dashboard',{
                controller:'DashboardCTRL'
            });

        $mdThemingProvider.theme('default')
            .primaryPalette("indigo")
            .accentPalette('green')
            .warnPalette('red');

}]);