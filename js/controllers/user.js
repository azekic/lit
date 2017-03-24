myApp.controller('UsersController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseObject','$firebaseArray','Authentication','$routeParams',
  function($scope, $rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, Authentication,$routeParams) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {

        var usersRef = ref.child('users').child(authUser.uid);
        var usersInfo = $firebaseObject(usersRef);
        $scope.user = usersInfo;
        //var users = firebase.auth().currentUser;


        $scope.updateInfo = function() {

            usersRef.update({
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                occupation: $scope.occupation,
                age: $scope.age,
                gender: $scope.gender
            }).then(function(){

            });
        }

        var storage = firebase.storage();
        var storageRef = storage.ref();

        var uploader = document.getElementById('uploader');
        var fileButton = document.getElementById('fileButton');
        var uploadButton = document.getElementById('uploadButton')

        var fileName;

        if(firebase.auth().currentUser.photoURL!=null){
            var photoRef = storageRef.child(firebase.auth().currentUser.photoURL);
            photoRef.getDownloadURL().then(function(url) {
                databasecurrentUserRef = ref.child('users').child(authUser.uid);
                databasecurrentUserRef.update({
                    profilePictureurl: url
                });
                document.querySelector('#profilePhoto').src = url ;
                }).catch(function(error) {
                  console.error(error);
                });
        }

      } //authUser
    }); //onAuthStateChanged


     $scope.linkToFacebook = function(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
          // Accounts successfully linked.
          var credential = result.credential;
          var user = result.user;
          Alert("success")
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
            if(error.code == "auth/credential-already-in-use"){
                    alert('This Facebook is already associated with a different user account.');
               }
            console.log(error);
            });


         firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            // Accounts successfully linked.
            var credential = result.credential;
            var user = result.user;
            // ...
          }
        }).catch(function(error) {
          // Handle Errors here.
             console.log(error);
          // ...
        });
    }

   $scope.unLinkToFacebook = function(){
        var user = firebase.auth().currentUser;
        var providerId = new firebase.auth.FacebookAuthProvider().providerId;
         console.log(providerId);
        user.unlink(providerId).then(function() {
          alert("Your Facebook account has been unlinked.");
        }).catch(function(error) {
          console.log(error.message);
            alert("You are not currently linked to a Facebook account.");
        });
    }

    $scope.updatePicture = function(){
         location.reload();
    }

    $scope.updatePassword = function(){

        var user = firebase.auth().currentUser;

        var newPassword = $scope.password;
        user.updatePassword(newPassword).then(function() {
          console.log(newPassword);
            alert("Your password has been changed. It will take effect on your next login.");
        }, function(error) {
            if(error.code == "auth/requires-recent-login"){
                alert("For security reasons, we require a recent login to change your password. Please re-login to enable this feature.");
            }
            if(newPassword.length < 6){
                alert("Password should be at least 6 characters");
            }
          console.log(error);
        });
    }

    $scope.deleteUser = function(){
        firebase.auth().currentUser.delete().then(function() {
          alert("Your account has been deleted!");
        }, function(error) {
          alert("Please log out and log in again and try to delete your account.");
        });
    }

    //console.log(firebase.auth().currentUser.email);

   fileButton.addEventListener('change',function(e){
		console.log("in");
        var file = e.target.files[0];
        fileName = file.name;
        console.log(fileName);
        var storageRef = firebase.storage().ref('pictures/' + file.name);
        var task = storageRef.put(file);

        task.on('state_changed',

            function progress(snapshot){

                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                uploader.value = percentage;
            },
            function error(err){
                console.log(err);
            }

       );
        var photoRef = "pictures/" + fileName;
        console.log(firebase.auth().currentUser);
        console.log(photoRef);
        firebase.auth().currentUser.updateProfile({
            photoURL: photoRef
        }).then(function(){
            console.log("sucess");
        });
    });

}]); //myApp.controller