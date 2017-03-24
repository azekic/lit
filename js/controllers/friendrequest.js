/**
 * Created by Weija on 2017-03-01.
 */
myApp.controller('FriendRequestController',
    ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray){

            var ref = firebase.database().ref();
            var auth = $firebaseAuth();
            auth.$onAuthStateChanged(function(authUser) {
                if(authUser) {
                    var friendrequestRef = ref.child('users').child(authUser.uid).child('friendRequests');
                    var friendRequestsList = $firebaseArray(friendrequestRef);
                    var auth = $firebaseAuth();
                    $scope.friendRequests = friendRequestsList;

                    $scope.addfriend = function(friendRequestID, friendID, friendFirstName, friendLastName, friendProfilePic) {
                        var friendRequestRef = ref.child('users/'+authUser.uid+'/friendRequests/'+ friendRequestID);
                        var senderfriendListRef = ref.child('users/'+friendID+'/friendList/');
                        var receiverfriendListRef = ref.child('users/'+authUser.uid+'/friendList/');
                        var receiverfriendRef = ref.child('users/'+authUser.uid);
                        var receiverFirstName;
                        var receiverLastName;
                        var receiverProfilePic;
                        receiverfriendRef.once("value", function(snapshot){
                            receiverFirstName = snapshot.val().firstname;
                            receiverLasttName = snapshot.val().lastname;
                            receiverProfilPic= snapshot.val().profilePictureurl;
                        });

                        receiverfriendListRef.push({
                            firstname: friendFirstName,
                            lastname: friendLastName,
                            profilePic: friendProfilePic,
                            friendID: friendID,
                        });
                        senderfriendListRef.push({
                            firstname: receiverFirstName,
                            lastname: receiverLasttName,
                            profilePic: receiverProfilPic,
                            friendID: authUser.uid
                        });
                        friendRequestRef.remove();
                    }
                    $scope.deleteFriendRequest = function(friendRequestID) {
                        var friendRequestRef = ref.child('users/'+authUser.uid+'/friendRequests/'+ friendRequestID);
                        friendRequestRef.remove();
                    }
                }

            })

        }]);
