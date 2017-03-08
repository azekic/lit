myApp.controller('RegistrationController', 
  ['$scope', 'Authentication',
  function($scope, Authentication) {
    var user = firebase.auth().currentUser;

  $scope.login = function() {
    Authentication.login($scope.user);
  };

  $scope.logout = function() {
    Authentication.logout();
  };

  $scope.register = function() {
    Authentication.register($scope.user);
  }; //register
$scope.changeEmail = function(){
        user.updateEmail("newemail@me.com").then(function() {
                                            $scope.email
                                               // Update successful.
                                             }, function(error) {
                                               // An error happened.
                                             });
  };
$scope.changeFirstName = function(){
    user.updateProfile({
      firstname: "newFirstName",
    }).then(function() {
      // Update successful.
    }, function(error) {
      // An error happened.
    });

  };
$scope.changeLastName = function(){
    user.updateProfile({
      lastname: "newLastName",
    }).then(function() {
      // Update successful.
    }, function(error) {
      // An error happened.
    });

  };
}]); //Controller