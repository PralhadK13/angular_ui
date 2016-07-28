
var app = angular.module('demoapp', [
  'ngRoute',
  'demoControllers'
]);


//routing path
app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
       when('/', {
           templateUrl: 'templates/index.html',
           controller: 'indexCtrl'
       }).
             when('/home', {
                 templateUrl: 'templates/dashboard.html',
                 controller: 'dashboardCtrl'
             }).
            otherwise({
                redirectTo: '/'
            });
  }]);
