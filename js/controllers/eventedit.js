myApp.controller('EventEditController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    $scope.whichevent = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var eventsRef = ref.child('users').child(authUser.uid).child('events');
        var eventsInfo = $firebaseArray(eventsRef);

        $scope.events = eventsInfo;

        $scope.addEvent = function() {
          eventsInfo.$add({
            name: "$scope.whichevent",
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {
            $location.path('www.google.com')-->
          }); //promise
        } //addEvent



/*
    var ref, checkinsList;

    $scope.whichevent = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    ref = firebase.database().ref()
      .child('users').child($scope.whichuser)
      .child('events').child($scope.whichevent)
      .child('checkins');

    checkinsList = $firebaseArray(ref);
    $scope.checkins = checkinsList;

    $scope.order = 'firstname';
    $scope.direction = null;
    $scope.query = '';

    $scope.addCheckin = function() {
      $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(function() {
        $location.path('/checkins/' + $scope.whichuser + '/' +
        $scope.whichevent + '/checkinsList')
      }); //$add
    }//addChecki
*/

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller
