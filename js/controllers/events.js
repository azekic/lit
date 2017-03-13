myApp.controller('EventsController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    // $scope.ne = $routeParams.neId;
    // $scope.sw = $routeParams.swId;

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
            eventdate: $scope.eventdate,
            type: $scope.eventtype,
            id: "", 
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {

            var key = eventsInfo.$keyAt(eventsInfo.length-1); 
            //receives key data from hash created by most recent event
            tempRef = eventsRef.child(key); 
            //references the most recently created event
            tempRef.update({          
              id: key
              //updates that event with its own hash
            })   


            var hostName; 
            ref.child('users').child(authUser.uid).on("value", function(snapshot){
            hostName = snapshot.val().firstname + ' ' + snapshot.val().lastname;});
            //finds the first name and last name of the creater of the event

            var regEventRef = ref.child('events').child(key).set({
            hostid: authUser.uid,
            hostname: hostName, 
            eventname: $scope.eventname,
            eventdate: $scope.eventdate,
            type: $scope.eventtype
            }); //This little part creates the same event id in the Events part of the database
            
            

            $scope.eventname='';//empties input field 
            $scope.eventdate='';//empties input field 
            $scope.eventtype='';//empties input field 
            window.location.href = "views/discovermap.html?eventId="+key;

          }); //promise
          ;
        } //addEvent

        $scope.deleteEvent = function(key) {
          var eventid = eventsInfo.$keyAt(key); 
          eventsInfo.$remove(key);
          var regEventRef = ref.child('events').child(eventid).remove();

        } //deleteEvent

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller
