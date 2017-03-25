myApp.controller('ProfileController',
    ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
        function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray)  {
            $scope.whichuser = $routeParams.uID;
            console.log($scope.whichuser);
            var refUser = firebase.database().ref('users/'+$scope.whichuser);
            var usersInfo = $firebaseObject(refUser);
            $scope.user = usersInfo;

        }]); //myApp.controller