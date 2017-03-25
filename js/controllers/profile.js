myApp.controller('ProfileController',
    ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
        function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray)  {
            $scope.whichuser = $routeParams.uID;
            var refUser = firebase.database().ref('users/'+$scope.whichuser);
            var usersInfo = $firebaseObject(refUser);
            $scope.user = usersInfo;
            var refUserEvents = firebase.database().ref('users').child($scope.whichuser).child('eventsGoing');
            var eventsGoingobj;
            var eventsGoingArray = [];
            refUserEvents.once('value',function(snapshot){
                eventsGoingobj = snapshot.val();
            }).then(function(){
                for (key in eventsGoingobj){
                    var keyRef = eventsGoingobj[key]['eventid'];
                    console.log(keyRef);
                    var eventRef = firebase.database().ref('events').child(keyRef);
                    var eventObj = $firebaseObject(eventRef);
                    console.log(eventObj);
                    eventsGoingArray.push(eventObj);
                }
                $scope.userEventsGoing= eventsGoingArray;
                // console.log(eventsGoingArray);
            });

        }]); //myApp.controller