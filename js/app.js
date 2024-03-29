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
  when('/views/map.html', {
      templateUrl: 'views/map.html',
      controller: 'HeatMapController'
  }).
  when('/views/alleventsmap.html', {
      templateUrl: 'views/alleventsmap.html',
      controller: 'AllEventsMapController'
  }).
  when('/alleventsmap', {
      templateUrl: 'views/eventmap.html',
      controller: 'EventMapController'
  }).
    when('/guide', {
      templateUrl: 'views/guide.html',
    }).
  when('/eventedit/:uId/:mId', {
      templateUrl: 'views/eventedit.html',
      controller: 'EventEditController'
  }).
    
    when('/eventedit//:mId', {
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
  when('/profile/:uID', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileController',
      resolve:{
      currentAuth: function(Authentication) {
          return Authentication.requireAuth();
      } //currentAuth
  }//resolve
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
      }).

  when('/allusers', {
      templateUrl: 'views/allusers.html',
      controller: 'AllUsersController',
      resolve: {
          currentAuth: function(Authentication) {
              return Authentication.requireAuth();
          } //currentAuth
      }//resolve

  }).
  when('/friendRequests', {
      templateUrl: 'views/friendRequests.html',
      controller: 'FriendRequestController',
      resolve: {
          currentAuth: function(Authentication) {
              return Authentication.requireAuth();
          } //currentAuth
      }//resolve

  }).
  when('/friendList', {
      templateUrl: 'views/friends.html',
      controller: 'FriendsController',
      resolve: {
          currentAuth: function(Authentication) {
              return Authentication.requireAuth();
          } //currentAuth
      }//resolve

  })
    .otherwise({redirectTo: "/events"});
}]);
