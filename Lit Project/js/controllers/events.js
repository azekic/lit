myApp.controller('EventsController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var eventsRef = ref.child('users').child(authUser.uid).child('events');
        var eventsInfo = $firebaseArray(eventsRef);

        $scope.events = eventsInfo;

        eventsInfo.$loaded().then(function(data) {
          $rootScope.howManyEvents = eventsInfo.length;
        }); // make sure event data is loaded

        eventsInfo.$watch(function(data) {
          $rootScope.howManyEvents = eventsInfo.length;
        });

        $scope.addEvent = function() {
          eventsInfo.$add({
            name: $scope.eventname,
            type: $scope.eventtype,
            eventDate: $scope.eventdate,
            //coordinate1 = $scope.topright,
            //coordinate2 = $scope.topleft,
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.eventname='';
          }); //promise
        } //addEvent

        $scope.deleteEvent = function(key) {
          window.alert(key); 
          eventsInfo.$remove(key);
        } //deleteEvent

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller
