myApp.controller('CheckInsController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray)  {
    $scope.whichevent = $routeParams.mId;
    var refGuestList = firebase.database().ref('events/'+$scope.whichevent+
        '/guestlist/');
    var checkinList = $firebaseArray(refGuestList);
    $scope.checkins = checkinList;
    $scope.deleteCheckIn = function(eventid) {
        var delref = firebase.database().ref('events').child($scope.whichevent).child('guestlist').child(eventid);
        delref.remove(); 
        } //deleteEvent
   
}]); //myApp.controller
