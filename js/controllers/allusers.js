/**
 * Created by Mitch on 2017-03-21.
 */

myApp.controller('AllUsersController',
    ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
        function($scope, $rootScope, $firebaseAuth, $firebaseObject, $firebaseArray) {

            var ref = firebase.database().ref();
            var auth = $firebaseAuth();

            auth.$onAuthStateChanged(function(authUser) {
                if(authUser) {
                    var usersRef = ref.child('users');
                    var usersInfo = $firebaseObject(usersRef);
                    var auth = $firebaseAuth();
                    $scope.users = usersInfo;


                } //authUser
            }); //onAuthStateChanged

        }]);
