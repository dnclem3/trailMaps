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

//Business Logic


//Firebase database variable
var firebaseRef = firebase.database().ref();
//Constructor for new bike trail
function Trail(trailName, distance, lat, long) {
  this.trailName = trailName;
  this.distance = distance;
  this.lat = lat;
  this.long = long;
  this.date = firebase.database.ServerValue.TIMESTAMP
}

var firebaseRefTrail = firebase.database().ref("Trails");

//Fetches files from firebase and populates trail selector
firebaseRefTrail.on('child_added', snap => {
  var trails = snap.child("trailName").val();
  $("#trail").append("<option>" + trails + "</option>");
});

//Generates reviews list page
firebaseRefTrail.on('child_added', snap => {
  var distance = snap.child("distance").val();
  var trailName = snap.child("trailName").val();

  $("#list").append(`<div class="demo-card-wide mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text">` +
  trailName + `</h2></div><div class="mdl-card__supporting-text">` +
  distance + ' miles' +
  `</div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Read Reviews</a></div>` +
  `<div class="mdl-card__menu"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
    <i class="material-icons">share</i></button></div></div>`);
});

var firebaseRefReviews = firebase.database().ref("Reviews");

firebaseRefReviews.on('child_added', snap => {
  var rating = snap.child("rating").val();
  var condition = snap.child("condition").val();
  var friendly = snap.child("friendly").val();
  var traffic = snap.child("traffic").val();
  var comments = snap.child("comments").val();
  var trailName = snap.child("trailName").val()

  $("#reviews").append(`<div class="card"><div class="card-block"><h2>` +
  trailName + `</h2><p>Rating ` + rating +
  ` stars</p><p>Notes ` + comments + `</p></div></div>`);
});

//Pushes files to Firebase database
var createTrail = function() {
  var trailName = $("#trailName").val();
  var distance = $("#distance").val();
  var long = $("#long").val();
  var lat = $("#lat").val();

  var newTrail = new Trail(trailName, distance, lat, long);
  return newTrail;
}

//Pushes reviews to firebase
var pushReview = function(review) {
  firebaseRef.child('Reviews').push().set(review);
}

var pushTrail = function(trail) {
  firebaseRef.child('Trails').push().set(trail);
}

//Constructor with all attributes of trail reviews
function Review(trailName, condition, traffic, friendly, rating, comments) {
  this.trailName = trailName;
  this.condition = condition;
  this.traffic = traffic;
  this.friendly = friendly;
  this.rating = rating;
  this.comments = comments;
  this.date = firebase.database.ServerValue.TIMESTAMP
}

//Method to gather inputs from the user
var createReview = function() {
  var trailName = $("#trail").val();
  var condition = $("input:radio[name=condition]:checked").val();
  var traffic = $("#traffic").val();
  var friendly = $("input:radio[name=friendly]:checked").val();
  var rating = $("#rating").val();
  var comments =$("#comments").val();

  var review = new Review(trailName, condition, traffic, friendly, rating, comments);
  return review;
}

var mymap = L.map('mapid').setView([47.608262, -122.305668], 13);

 L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG5jbGVtMyIsImEiOiJjajEyeWxscWIwMGp1MzJwMXByd28waW83In0.PKZV-kndiDaRkLaBz89cvw', {
     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
     maxZoom: 18,
     id: 'mapid',
     accessToken: 'pk.eyJ1IjoiZG5jbGVtMyIsImEiOiJjajEyeWxscWIwMGp1MzJwMXByd28waW83In0.PKZV-kndiDaRkLaBz89cvw'
 }).addTo(mymap);

function MoveMap(lat, lng) {
  mymap.panTo(new L.LatLng(lat, lng));
}

//Interface Logic
$(document).ready(function() {
  //When add Trail button clicked, reveals form
  $("#formShow").click(function() {
    $("#trailPick").hide();
    $("#trailForm").show();
  })
  //When submit button on review form is clicked
  $("form#reviewForm").submit(function(e) {
    e.preventDefault();
    var test = createReview();
    pushReview(test);
  })
  //When trail entry button clicked, submits object to firebase
  $("form#trailEntry").submit(function(e) {
    e.preventDefault();
    var newTrail = createTrail();
    alert(newTrail.trailName);
    pushTrail(newTrail);
    $("#trailForm").hide();
    $("#trailPick").show();
  })
})
