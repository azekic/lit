/**
 * Created by Weija on 2017-03-01.
 *Controller used to control the all events page 
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
        //creates a firebase array, allevents.html iterates through this array to display events 

        

        var auth = $firebaseAuth();
        //Need reference to auth to obtain specific firebase id of user 
        //This id is used when you are storing user id into the event he wants to go to 
        
        $scope.events = eventsList;
        //creates front end accessible variable out of the firebase array 


        $scope.addUser = function(eventid) {
            var eventRef = ref.child('events/'+eventid+"/guestlist/"+authUser.uid);
            var hostName; 

            //fancy .on function is firebase syntax used to read data from firebase 
            ref.child('users').child(authUser.uid).on("value", function(snapshot){
            
            //creates hostname by concatenating both first name and last name, can be changed 
            hostName = snapshot.val().firstname + ' ' + snapshot.val().lastname;});
            
            //.update is function in firebase to change data within eventRef(firebase reference) 
            eventRef.update({
                name: hostName    
            }); 
          } 
      }
  })

}]);
