//Business Logic
var uniqueId = [];

//Constructor for new bike trail
function Trail(trailName, distance) {
  this.trailName = trailName;
  this.distance = distance;
  this.review = [];
}
//Method for adding trail to the form
Trail.prototype.addToTrailList = function() {
  $("#trail").append('<option value="' + this.trailName + '">' + this.trailName + ' </option>');
}
//Constructor with all attributes of trail reviews
function Review(trail, condition, traffic, friendly, rating, comments) {
  this.uniqueId = uniqueId.length + 1
  this.trail = trail;
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
var burkeGilman = new Trail("Burke Gilman", 35);
var elliotBay = new Trail("Elliot Bay", 7);

//Calling method on objects
burkeGilman.addToTrailList();
elliotBay.addToTrailList();

//Method to gather inputs from the user
var getReview = function() {
  var trail = $("#trail").val();
  var condition = $("input:radio[name=condition]:checked").val();
  var traffic = $("#traffic").val();
  var friendly = $("input:radio[name=friendly]:checked").val();
  var rating = $("#rating").val();
  var comments =$("#comments").val();
  var review = new Review(trail, condition, traffic, friendly, rating, comments);
  return review;

}
//Map for biking trails
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZG5jbGVtMyIsImEiOiJjajEyeWxscWIwMGp1MzJwMXByd28waW83In0.PKZV-kndiDaRkLaBz89cvw', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapid',
    accessToken: 'pk.eyJ1IjoiZG5jbGVtMyIsImEiOiJjajEyeWxscWIwMGp1MzJwMXByd28waW83In0.PKZV-kndiDaRkLaBz89cvw'
}).addTo(mymap);

//Interface Logic
$(document).ready(function() {
  $("form").submit(function(e) {
    e.preventDefault();
    var test = getReview();
    console.log(test);
  })
})
