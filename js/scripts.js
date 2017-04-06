//Business Logic

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDJP-6G9qaawtkX8D6Dgd9FYnCbVPdGmP8",
  authDomain: "biketrails-5d255.firebaseapp.com",
  databaseURL: "https://biketrails-5d255.firebaseio.com",
  projectId: "biketrails-5d255",
  storageBucket: "biketrails-5d255.appspot.com",
  messagingSenderId: "571495490901"
};
firebase.initializeApp(config);

//Unique IDs
var uniqueId = [];
var uniqueObId = [];
var trails = [];



//Constructor for new bike trail
function Trail(trailName, distance, lat, long) {
  this.obId = uniqueObId.length + 1
  this.trailName = trailName;
  this.distance = distance;
  this.lat = lat;
  this.long = long;
  this.review = [];
  this.pushUniqueId(this.obId);
  this.addtoTrails();
}
//Method for adding trail to the form
function updateTrails(){
  $("#trail").text();
  trails.forEach(function(trail){
    $("#trail").append("<option>" + trail.trailName + "</option>");
  });
}

Trail.prototype.addtoTrails = function() {
  trails.push(this);
}

function returnTrails() {
  var select = $("#trail").val();
  var object = "";
    trails.forEach(function(trail) {
    if (select === trail.trailName) {
      object = trail;
    }
  });
  return object;
}

//Method for adding map coordinates to js Leaflet
Trail.prototype.mapCoordinates = function() {
  var mymap = L.map('mapid').setView([this.lat, this.long], 15);
  return mymap;
}

Trail.prototype.pushUniqueId = function(id) {
  uniqueObId.push(id);
}

Trail.prototype.writeUserData = function() {
  var firebaseRef = firebase.database().ref();
  firebaseRef.child(this.obId).set(this);
}

//Constructor with all attributes of trail reviews
function Review(condition, traffic, friendly, rating, comments) {
  this.uniqueId = uniqueId.length + 1
  this.condition = condition;
  this.traffic = traffic;
  this.friendly = friendly;
  this.rating = rating;
  this.comments = comments;
  this.pushUniqueId(this.uniqueId);
}

//Method to push objects into variable
Review.prototype.pushUniqueId = function(id) {
  uniqueId.push(id);
}

//Create new objects
var burkeGilman = new Trail("Burke Gilman", 35, 47.593968, -122.306171);
var elliotBay = new Trail("Elliot Bay", 7, 47.785089, -122.325275);
var arboretuem = new Trail("Arboretuem", 3, 47.785089, -120.325221);

updateTrails();
//Calling method on objects
var mymap = elliotBay.mapCoordinates();

//Method to gather inputs from the user
var getReview = function() {
  var condition = $("input:radio[name=condition]:checked").val();
  var traffic = $("#traffic").val();
  var friendly = $("input:radio[name=friendly]:checked").val();
  var rating = $("#rating").val();
  var comments =$("#comments").val();
  var review = new Review(condition, traffic, friendly, rating, comments);
  return review;
}


//Map for biking trails
var updateMap = function() {     L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG5jbGVtMyIsImEiOiJjajEyeWxscWIwMGp1MzJwMXByd28waW83In0.PKZV-kndiDaRkLaBz89cvw', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      accessToken: 'pk.eyJ1IjoiZG5jbGVtMyIsImEiOiJjajEyeWxscWIwMGp1MzJwMXByd28waW83In0.PKZV-kndiDaRkLaBz89cvw'
  }).addTo(mymap);
}
updateMap();
//Interface Logic
$(document).ready(function() {
  $("#trail").on(function() {
    var mymap = elliotBay.mapCoordinates();
    updateMap();

  })
  $("form").submit(function(e) {
    e.preventDefault();
    var test = getReview();
    var objectName = returnTrails();
    objectName.review.push(test);
    objectName.writeUserData();
  })
})
