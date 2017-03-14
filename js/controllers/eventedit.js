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
            eventname: $scope.eventname,
            eventdate: $scope.eventdate,
            eventtype: $scope.eventtype,
            eventfloor: $scope.eventfloor,
            eventdescription: $scope.eventdescription,
            archive: "false",
          }).then(function() {
            var regEventRef = ref.child('events').child($scope.whichevent).update({
              eventname: $scope.eventname,
              eventdate: $scope.eventdate,
              eventtype: $scope.eventtype,
              eventfloor: $scope.eventfloor,
              eventdescription: $scope.eventdescription,
            }); //This little part creates the same event id in the Events part of the database
            $scope.eventname='';//empties input field
            $scope.eventdate='';//empties input field
            $scope.eventtype='';//empties input field
            window.location.href = "/app/#/events";
          }); //promise
      } //editEvent

}]); //myApp.controller
