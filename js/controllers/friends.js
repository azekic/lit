/**
 * Created by Weija on 2017-03-01.
 */
myApp.controller('FriendsController',
    ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray){
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var friendListRef = ref.child('users').child(authUser.uid).child('friendList');
        var friendList = $firebaseArray(friendListRef);
        var auth = $firebaseAuth();
        $scope.friendList = friendList;

        $scope.deletefriend = function(friendID,receiveUserID) {
            var receivefriendRef = ref.child('users/'+authUser.uid+'/friendList/'+ friendID);         
            receivefriendRef.remove(); 
            var senderfriendRef = ref.child('users').child(receiveUserID).child('friendList');
            var deleteid = '#'; 
            senderfriendRef.once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var userID = childSnapshot.val().friendID;
                    if (userID == authUser.uid){
                        deleteid = childSnapshot.key; 
                        var deleteSenderFriendRef = ref.child('users').child(receiveUserID).child('friendList').child(deleteid);
                        deleteSenderFriendRef.remove(); 
                    }
                }); 
            }); 
          } 

        }
    

  })


}]);
