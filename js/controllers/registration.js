myApp.controller('RegistrationController',
  ['$scope', 'Authentication',
  function($scope, Authentication) {

  $scope.login = function() {
    Authentication.login($scope.user);
  };

  $scope.logout = function() {
    Authentication.logout();
  };

  $scope.register = function() {
    Authentication.register($scope.user);
  }; //register
      /**
       * Function called when clicking the Login/Logout button.
       */
// [START buttoncallback]
      function toggleSignIn() {
          if (!firebase.auth().currentUser) {
              // [START createprovider]
              var provider = new firebase.auth.FacebookAuthProvider();
              // [END createprovider]
              // [START addscopes]
              provider.addScope('user_birthday');
              // [END addscopes]
              // [START signin]
              firebase.auth().signInWithPopup(provider).then(function (result) {
                  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                  var token = result.credential.accessToken;
                  // The signed-in user info.
                  var authUser = result.authUser;
                  // [START_EXCLUDE]
                  document.getElementById('facebook-oauthtoken').textContent = token;
                  // [END_EXCLUDE]
              }).catch(function (error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // [START_EXCLUDE]
                  if (errorCode === 'auth/account-exists-with-different-credential') {
                      alert('You have already signed up with a different auth provider for that email.');
                      // If you are using multiple auth providers on your app you should handle linking
                      // the user's accounts here.
                  } else {
                      console.error(error);
                  }
                  // [END_EXCLUDE]
              });
              // [END signin]
          } else {
              // [START signout]
              firebase.auth().signOut();
              // [END signout]
          }
          // [START_EXCLUDE]
          document.getElementById('facebook-sign-in').disabled = true;
          // [END_EXCLUDE]
      }

// [END buttoncallback]
      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */

      function initApp() {
          // Listening for auth state changes.
          // [START authstatelistener]
          firebase.auth().onAuthStateChanged(function (authUser) {
              if (authUser) {
                  document.getElementById('facebook-sign-in');
              }
              // [START_EXCLUDE]
              document.getElementById('facebook-sign-in').disabled = false;
              // [END_EXCLUDE]
          });
          // [END authstatelistener]

          document.getElementById('facebook-sign-in').addEventListener('click', toggleSignIn, false);
      }

      $scope.$on('$viewContentLoaded', function () {
          initApp();
      });

      //Used for if the user refreshes the page manually.

      window.onload = function () {
          firebase.auth().onAuthStateChanged(function (authUser) {
              if (authUser) {

                  document.getElementById('facebook-sign-in');

              }
              // [START_EXCLUDE]
              document.getElementById('facebook-sign-in');
              // [END_EXCLUDE]
          })};



}]); //Controller