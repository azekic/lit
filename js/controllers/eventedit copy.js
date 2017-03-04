myApp.controller('EventsEditController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    var eventRef = firebase.database().ref("users/U8dWDmMWDFU6nc90xZAOcqDun0o1/events/KeM6xIfUt7TZd1X7h38");
          window.alert(7);

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        window.alert(authUser.uid); 
        var eventsRef = ref.child('users').child(authUser.uid).child('events');
        var eventsInfo = $firebaseArray(eventsRef);


        $scope.events = eventsInfo;

        eventsInfo.$loaded().then(function(data) {
          $rootScope.howManyEvents = eventsInfo.length;
        }); // make sure event data is loaded

        eventsInfo.$watch(function(data) {
          $rootScope.howManyEvents = eventsInfo.length;
        });

        $scope.editEvent = function() {
          window.alert(10);
          eventRef.set({
            name: $scope.eventname,
            type: $scope.eventtype,
            eventDate: $scope.eventdate,
            //coordinate1 = $scope.topright,
            //coordinate2 = $scope.topleft,
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.eventname='';
          }); //promise
        } //editEvent

        

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller
