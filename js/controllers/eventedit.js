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
                   name: $scope.eventname,
                   eventDate: $scope.eventdate,
                   type: $scope.eventtype,
                   //add coordinates
                   creationDate: firebase.database.ServerValue.TIMESTAMP
                   $window.location.href = '/index.html';
                 }).then(function() {
                   $scope.eventname='hello';

                 }); //promise
               } //addEvent

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller


  function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}



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
