myApp.controller('DiscoverMapController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray)  {
window.alert("hello"); 
var rectangle;
var map;
var infoWindow;
window.alert("hey"); 
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.00627, lng: -81.274957},
    zoom: 16
  });

  var bounds = {
    north: 43.0062697,
    south: 43.0048041,
    east: -81.2749570,
    west: -81.2781186
  };


  // Define the rectangle and set its editable property to true.
  rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true
  });

  rectangle.setMap(map);

  // Add an event listener on the rectangle.
  rectangle.addListener('bounds_changed', showNewRect);

  // Define an info window on the map.
  infoWindow = new google.maps.InfoWindow();
}
// Show the new coordinates for the rectangle in an info window.

/** @this {google.maps.Rectangle} */
function showNewRect(event) {
  var ne = rectangle.getBounds().getNorthEast();
  var sw = rectangle.getBounds().getSouthWest();

  var contentString = '<b>Rectangle moved.</b><br>' +
      'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
      'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

  // Set the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(ne);

  infoWindow.open(map);
  document.getElementById("submit").href = "#/eventedit/"+ne.lat() +"/"+ sw.lat()+"/";
}
   
}]); //myApp.controller
