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
                    var timelineRef = ref.child('events');
                    var timelineInfo = $firebaseArray(timelineRef);

                    $scope.events = timelineInfo;

                    timelineInfo.$loaded().then(function(data) {
                        $rootScope.howManyEvents = eventsInfo.length;
                    }); // make sure event data is loaded

                    timelineInfo.$watch(function(data) {
                        $rootScope.howManyEvents = eventsInfo.length;
                    });

                    $scope.addEvent = function() {
                        timelineInfo.$add({
                            name: $scope.eventname,
                            date: firebase.database.ServerValue.TIMESTAMP
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
