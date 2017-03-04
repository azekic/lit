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
                   eventDate: $scope.eventdate,
                   type: $scope.eventtype,
                   //add coordinates
                   creationDate: firebase.database.ServerValue.TIMESTAMP
                 }).then(function() {
                   $scope.eventname='xyz';
                   $scope.eventdate='';
                 });
               } //addEvent

        $scope.deleteEvent = function(key) {
          eventsInfo.$remove(key);
        } //deleteEvent

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller
