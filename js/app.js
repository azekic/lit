var myApp = angular.module('myApp',
  ['ngRoute', 'firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = 'Sorry, you must log in to access that page';
      $location.path('/login');
    }//Auth Required
  }); //$routeChangeError
}]); //run

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/guide', {
      templateUrl: 'views/guide.html',
    }).
    
    when('/eventedit/:uId/:mId', {
      templateUrl: 'views/eventedit.html',
      controller: 'EventEditController'
    }).
    when('/checkinsList/:mId', {
      templateUrl: 'views/checkinslist.html',
      controller: 'CheckInsController'
    }).
    when('/checkinsListAuth/:mId', {
      templateUrl: 'views/checkinslistauth.html',
      controller: 'CheckInsController'
    }).
    when('/addevent/:nId/:eId/:sId/:wId/', {
      templateUrl: 'views/addevent.html',
      controller: 'EventsMapController'
    }).
  when('/accountsetting', {
      templateUrl: 'views/accountsetting.html',
      controller: 'UsersController',
      resolve: {
          currentAuth: function(Authentication) {
              return Authentication.requireAuth();
          } //currentAuth
      }//resolve
  }).//
    when('/events', {
      templateUrl: 'views/events.html',
      controller: 'EventsController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //currentAuth
      }//resolve
    }).
    when('/addevent', {
      templateUrl: 'views/addevent.html',
      controller: 'EventsController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //currentAuth
      }//resolve
    }).

    when('/allevents', {
      templateUrl: 'views/allevents.html',
      controller: 'AllEventsController',
      resolve: {
      currentAuth: function(Authentication) {
          return Authentication.requireAuth();
      } //currentAuth
  }//resolve
      }).

  when('/allusers', {
      templateUrl: 'views/allusers.html',
      controller: 'AllUsersController',

  })
    .otherwise({redirectTo: "/events"});
}]);
