/**
 * Created by Weija on 2017-03-01.
 */
myApp.controller('AllUsersController',
    ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray){

            var ref = firebase.database().ref();
            var auth = $firebaseAuth();
            auth.$onAuthStateChanged(function(authUser) {
                if(authUser) {
                    var usersRef = ref.child('users');
                    var usersList = $firebaseArray(usersRef);
                    var auth = $firebaseAuth();
                    $scope.users = usersList;

                    $scope.addfriend = function(friendID) {
                        userProfileref = ref.child('users').child(authUser.uid);
                        profilerefObject = {};
                        //object used to check if user is already friends or already sent them friend request

                        userProfileref.once('value',function(datasnapshot){
                            profilerefObject = datasnapshot.val();
                        });


                        for (var key in profilerefObject.friendList){
                            if (profilerefObject["friendList"][key]["friendID"] === friendID){
                                window.alert("Already friends");
                                return;
                            }

                        }
                        for (var key in profilerefObject.friendRequests){
                            if (profilerefObject["friendRequests"][key]["friendID"] === friendID){
                                window.alert("Already Sent Friend Request");
                                return;
                            }

                        }
                        if (friendID == authUser.uid){
                            window.alert("Can't add yourself")
                            return;
                        }

                        var friendRequestRef = ref.child('users/'+friendID+"/friendRequests/");
                        var senderfirstName;
                        var senderlastName;
                        var senderProfilepic;
                        ref.child('users').child(authUser.uid).on("value", function(snapshot){
                            senderfirstName = snapshot.val().firstname;
                            senderlastName = snapshot.val().lastname;
                            senderProfilepic = snapshot.val().profilePictureurl;
                        });
                        friendRequestRef.push({
                            firstname: senderfirstName,
                            lastname: senderlastName,
                            profilePic: senderProfilepic,
                            friendID: authUser.uid
                        });
                    }
                }
            })

        }]);
