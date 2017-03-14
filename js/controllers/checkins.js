myApp.controller('CheckInsController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray)  {
    
    //routeParams accesses the url link to get variable information, specifically mID refers to the 
    //specific id of the event user is targetting
    $scope.whichevent = $routeParams.mId;

    //references the firebase for the specific event, given the event id
    var refGuestList = firebase.database().ref('events/'+$scope.whichevent+
        '/guestlist/');

    //creates firebase array so the front end can iterate through the arrya to display 
    //event information 
    var checkinList = $firebaseArray(refGuestList);

    //creates front end accessible array ($scope means accessible from front end)
    $scope.checkins = checkinList;

    //deletecheckin function that deletes someone from the host's event guest list 
    $scope.deleteCheckIn = function(eventid) {
        var delref = firebase.database().ref('events').child($scope.whichevent).child('guestlist').child(eventid);
        delref.remove(); 
        } 
   
}]); //myApp.controller
