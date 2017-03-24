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
        

        $scope.linkToFacebook = function(){  
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
          // Accounts successfully linked.
          var credential = result.credential;
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          if (errorCode === 'auth/account-exists-with-different-credential') {
                      alert('You have already signed up with a different auth provider for that email.');
          }
        });
        
        firebase.authsgetRedirectResult().then(function(result) {
          if (result.credential) {
            // Accounts successfully linked.
            var credential = result.credential;
            var user = result.user;
            // ...
          }
        }).catch(function(error) {
          // Handle Errors here.
          // ...
        });
    }
    
   $scope.unLinkToFacebook = function(){
        var user = firebase.auth().currentUser;
        var providerId = new firebase.auth.FacebookAuthProvider().providerId;
         console.log(providerId);
        user.unlink(providerId).then(function() {
          alert("success");
        }).catch(function(error) {
          // An error happened
        });
    }
     
     $scope.updatePicture = function(){
         location.reload();
     }
      
     $scope.updatePassword = function(){          
            Authentication.updatePassword($scope.password);
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
              document.querySelector('img').src = url ;
            }).catch(function(error) {
              console.error(error);
            });
    }
    
    //var photoRef = storageRef.child(firebase.auth().currentUser.photoURL);
    //console.log(photoRef);
      /*
        photoRef.getDownloadURL().then(function(url) {
              console.log(url);
              document.querySelector('img').src = url + new Date().getTime();
            }).catch(function(error) {
              console.error(error);
            });*/
    
      
   fileButton.addEventListener('change',function(e){
        console.log("in");
        var file = e.target.files[0];
        fileName = file.name;
        console.log(fileName);
        var storageRef = firebase.storage().ref('pictures/' + file.name);
        var task = storageRef.put(file);
        
        //var userRef = firebase.auth().currentUser;
        
                                
        task.on('state_changed',

            function progress(snapshot){
            
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                uploader.value = percentage;


            },
            function error(err){

            },
            function complete(){

            }

           );   
        var photoRef = "pictures/" + fileName;
        console.log(firebase.auth().currentUser);
        console.log(photoRef);

        firebase.auth().currentUser.updateProfile({
            photoURL: photoRef
        }).then(function(){
            var photoURL = firebase.auth().currentUser.photoURL;
            console.log("this is " + photoURL);
            console.log("sucess");
        });
        
    });
      
      } //authUser
    }); //onAuthStateChanged
     
      

      
   
    
      
          
   
    
}]); //myApp.controller