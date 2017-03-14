myApp.controller('EventEditController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray)  {
    $scope.whichevent = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;
    var refEvent = firebase.database().ref('users/'+$scope.whichuser+
        '/events/'+$scope.whichevent);
    var ref = firebase.database().ref();

    $scope.editEvent = function() {
          refEvent.update({
            name: $scope.eventname,
            eventdate: $scope.eventdate,
            type: $scope.eventtype,


          }).then(function() {
            var regEventRef = ref.child('events').child($scope.whichevent).update({
            eventname: $scope.eventname,
            eventdate: $scope.eventdate,
            type: $scope.eventtype
            }); //This little part creates the same event id in the Events part of the database
            $scope.eventname='';//empties input field
            $scope.eventdate='';//empties input field
            $scope.eventtype='';//empties input field
            $location.path(view);
          }); //promise
      } //editEvent

}]); //myApp.controller
