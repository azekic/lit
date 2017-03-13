myApp.controller('UsersController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseObject','$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseObject, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var usersRef = ref.child('users').child(authUser.uid);
        var usersInfo = $firebaseObject(usersRef);

        $scope.users = usersInfo;
       
        var imageRef = ref.child('users').child(authUser.uid).child("image");
        var imageInfo = $firebaseObject(usersRef);
          
        $scope.imageinfo = imageInfo;  
          
        $scope.addProfilePic = function(){
            imageRef.set({
                image: $scope.userimage
            }).then(function(){
                $scope.userimage='';
            });
        }
      } //authUser
    }); //onAuthStateChanged
}]); //myApp.controller
