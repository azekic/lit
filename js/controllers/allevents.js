/**
 * Created by Weija on 2017-03-01.
 */
myApp.controller('AllEventsController',
    ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray){

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var eventsRef = ref.child('events');
        var eventsList = $firebaseArray(eventsRef);
        var auth = $firebaseAuth();
        $scope.events = eventsList;

        $scope.addUser = function(eventid) {
            var eventRef = ref.child('events/'+eventid+"/guestlist/"+authUser.uid);
            var hostName;
            ref.child('users').child(authUser.uid).on("value", function(snapshot){
            hostName = snapshot.val().firstname + ' ' + snapshot.val().lastname;});
            eventRef.update({
                name: hostName
            });
          } //editEvent
      }
  })

}]);
