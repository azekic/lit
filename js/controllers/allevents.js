/**
 * Created by Weija on 2017-03-01.
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
          var auth = $firebaseAuth();
          var eventsListBack= $firebaseArray(eventsRef);

          //$scope.category = eventsListBack;

          $scope.makeList = function(order){
              if (order == 'all'){
                  $scope.category = eventsList;
              }
              else{
                  if (order == 'recent'){
                      $scope.category =  eventsListBack.reverse();
                  }
                  else {
                      if (order == 'archive'){
                          var archRef = ref.child('archive/events');
                          $scope.category = $firebaseArray(archRef);
                      }
                      else {
                          if (order == 'time') {
                              var categories = eventsRef.orderByChild('eventdate');
                              $scope.category = $firebaseArray(categories);
                          }
                          else {
                              var categories = eventsRef.orderByChild('eventtype').equalTo(order);
                              var categoriesList = $firebaseArray(categories);
                              $scope.category = categoriesList;
                          }
                      }
                  }
              }
          };

         $scope.searchList = function(input){
             var inputLower = input.toLowerCase();
             var input1 = "";
                 input1 = input + "\uf8ff";
               var list = eventsRef.orderByChild('eventname').startAt(input).endAt(input1);
               $scope.category= $firebaseArray(list);
          };

        $scope.addUser = function(eventid) {
            var eventRef = ref.child('events/'+eventid+"/guestlist/"+authUser.uid);
            var hostName; 
            ref.child('users').child(authUser.uid).on("value", function(snapshot){
            hostName = snapshot.val().firstname + ' ' + snapshot.val().lastname;});
            eventRef.update({
                name: hostName    
            }); 
          } //editEvent
      }
  })

}]);
