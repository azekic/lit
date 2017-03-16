myApp.controller('EventsController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    // $scope.ne = $routeParams.neId;
    // $scope.sw = $routeParams.swId;

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {

        //all events
        var eventsRef = ref.child('users').child(authUser.uid).child('events');
        var eventsInfo = $firebaseArray(eventsRef);
        $scope.events = eventsInfo;

        //archived events
        var archiveRef = ref.child('archive').child('events');
        var archive = $firebaseArray(archiveRef);
        $scope.archive = archive;

        eventsInfo.$loaded().then(function(data) {
          $rootScope.howManyEvents = eventsInfo.length;
        }); // make sure event data is loaded

        eventsInfo.$watch(function(data) {
          $rootScope.howManyEvents = eventsInfo.length;
        });

        $scope.addEvent = function() {

          eventsInfo.$add({
            eventname: $scope.eventname,
            eventdate: $scope.eventdate,
            eventtype: $scope.eventtype,
            eventfloor: $scope.eventfloor,
            eventdescription: $scope.eventdescription,
            archive: "false",
            hostid: authUser.uid,
            datecreated: firebase.database.ServerValue.TIMESTAMP,

            //
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
              eventname: $scope.eventname,
              eventdate: $scope.eventdate,
              eventtype: $scope.eventtype,
              eventfloor: $scope.eventfloor,
              eventdescription: $scope.eventdescription,
              archive: "false",
              hostid: authUser.uid,
              hostname: hostName,
              datecreated: firebase.database.ServerValue.TIMESTAMP
            }); //This little part creates the same event id in the Events part of the database



            $scope.eventname='';//empties input field
            $scope.eventdate='';//empties input field
            $scope.eventtype='';//empties input field
            window.location.href = "views/discovermap.html?eventId="+key;

          }); //promise
          ;
        } //addEvent

        $scope.deleteEvent = function(key) {

          //gets the event ID
          var id = eventsInfo.$keyAt(key);

          //gets the variables
          ref.child('events').child(id).on("value", function(snapshot){
            name = snapshot.val().eventname;
            type = snapshot.val().eventtype;
            date = snapshot.val().eventdate;
            description = snapshot.val().eventdescription;
            floor = snapshot.val().eventfloor;
            host = snapshot.val().hostname;
            created = snapshot.val().datecreated;
            coordinates = snapshot.val().coord;
          });

          $scope.archive.$add({
            //assign the variables
            eventname: name,
            eventtype: type,
            eventdate: date,
            eventdescription: description,
            eventfloor: floor,
            hostname: host,
            datecreated: created,
            coord: coordinates,

            //create new ones
            archive: "true",
            hostid: authUser.uid,
            datearchived: firebase.database.ServerValue.TIMESTAMP

          })

          //delete the event first from database/user/events then from database/events
          eventsInfo.$remove(key);
          var regEventRef = ref.child('events').child(id).remove();

        } //deleteEvent

      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller
