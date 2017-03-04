/**
 * Created by Garren on 2017-03-01.
 */
myApp.controller('AllEventsController',
    ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray){

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
            auth.$onAuthStateChanged(function(authUser) {
                if(authUser) {
                    var eventsRef = ref.child('users').child(authUser.uid).child('events');
                    var eventsInfo = $firebaseArray(eventsRef);

                    var timelineRef = ref.child('events');
                    var timelineInfo = $firebaseArray(timelineRef);

                    $scope.events = eventsInfo;


                    timelineInfo.$loaded().then(function(data) {
                        $rootScope.howManyEvents = timelineInfo.length;
                    }); // make sure event data is loaded

                    timelineInfo.$watch(function(data) {
                        $rootScope.howManyEvents = timelineInfo.length;
                    });

                    $scope.addEvent = function() {
                        eventsInfo.$add({
                            name: $scope.eventname,
                            date: firebase.database.ServerValue.TIMESTAMP
                        }).then(function() {
                            $scope.eventname='';
                        }); //promise

                        timelineInfo.$add({
                            name: $scope.eventname,
                            date: firebase.database.ServerValue.TIMESTAMP,

                        }).then(function() {
                            $scope.eventname='';
                        }); //promise
                    } //addEvent

                    $scope.deleteEvent = function(key) {
                        eventsInfo.$remove(key);
                    } //deleteEvent

                } //authUser
            }); //onAuthStateChanged
}]);
