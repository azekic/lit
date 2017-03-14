myApp.controller('EventEditController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray)  {
    
    //Uses routeparams to get variables from url, declaration of these specific variables
    //are found in app.js
    $scope.whichevent = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    var refEvent = firebase.database().ref('users/'+$scope.whichuser+
        '/events/'+$scope.whichevent);
    var ref = firebase.database().ref();

    $scope.editEvent = function() {
          //update is firebase method to update data within firebase 
          //updates firebase in local user 
          refEvent.update({
            name: $scope.eventname,
            eventdate: $scope.eventdate,
            type: $scope.eventtype, 

            
          }).then(function() {

            //if the above is successful, then the function will update the 
            //event information under the events directory under firebase 
            //there are two references to each event, one under the host who 
            //created the event, one under the overall event directory 
            
            var regEventRef = ref.child('events').child($scope.whichevent).update({
            eventname: $scope.eventname,
            eventdate: $scope.eventdate,
            type: $scope.eventtype
            }); //This little part creates the same event id in the Events part of the database
            $scope.eventname='';//empties input field 
            $scope.eventdate='';//empties input field 
            $scope.eventtype='';//empties input field          
          }); //promise
      } //editEvent
    
}]); //myApp.controller
