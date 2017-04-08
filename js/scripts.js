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

var firebaseRefData = firebase.database().ref();

//Constructor for new bike trail
function Trail(trailName, distance, lat, long) {
  this.trailName = trailName;
  this.distance = distance;
  this.lat = lat;
  this.long = long;
}
//Method for adding trail to the form
var firebaseRefData = firebase.database().ref();

//Fetches files from firebase and populates trail selector
firebaseRefData.on('child_added', snap => {
  var trails = snap.child("trailName").val();
  $("#trail").append("<option>" + trails + "</option>");
});

//Generates reviews list page
firebaseRefData.on('child_added', snap => {
  var rating = snap.child('review').child('0').child("rating").val();
  var traffic = snap.child("traffic").val();
  var friendly = snap.child("friendly").val();
  var comments = snap.child("comments").val();

  $("#list").append(`<div class="demo-card-wide mdl-card mdl-shadow--2dp"><div class="mdl-card__title"><h2 class="mdl-card__title-text">Rating ` +
  rating + `</h2></div><div class="mdl-card__supporting-text">` + comments);
});

//Pushes files to Firebase database
var pushToDatabase = function() {
  var trailName = $("#trailName").val();
  var distance = $("#distance").val();
  var long = $("#long").val();
  var lat = $("#lat").val();
  alert(trailName);

  var newTrail = new Trail(trailName, distance, lat, long);
  alert(newTrail.trailName);
  return newTrail;
}

//Pushes reviews to firebase
var writeUserData = function(review) {
  var firebaseRef = firebase.database().ref();
  firebaseRefData.push().set(review);
}

//Constructor with all attributes of trail reviews
function Review(trailName, condition, traffic, friendly, rating, comments) {
  this.trailName = trailName;
  this.condition = condition;
  this.traffic = traffic;
  this.friendly = friendly;
  this.rating = rating;
  this.comments = comments;
}

//Method to gather inputs from the user
var getReview = function() {
  var trailName = $("#trail").val();
  var condition = $("input:radio[name=condition]:checked").val();
  var traffic = $("#traffic").val();
  var friendly = $("input:radio[name=friendly]:checked").val();
  var rating = $("#rating").val();
  var comments =$("#comments").val();

  var review = new Review(trailName, condition, traffic, friendly, rating, comments);
  return review;
}

//Interface Logic
$(document).ready(function() {

  //When submit button on review form is clicked
  $("form#reviewForm").submit(function(e) {
    e.preventDefault();
    var test = getReview();
    writeUserData(test);
  })

  $("form#trailEntry").submit(function(e) {
    e.preventDefault();
    var firebaseRef = firebase.database().ref();
    var newTrail = pushToDatabase();
    alert(newTrail.trailName);
    firebaseRef.push().set(newTrail);
  })
})
