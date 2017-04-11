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

var firebaseRefTrail = firebase.database().ref("Trails");

var firebaseRefReviews = firebase.database().ref("Reviews");

firebaseRefTrail.on('child_added', snap => {
  var trailName = snap.child("trailName").val();
  var distance = snap.child("distance").val();

  $("#trailList").append(`<div class="thumbnail">
                               <h4>` + trailName + `</h4>
                               <p>` + distance + ` miles</p>
                           </div>`);
  });

//Interface Logic
$(document).ready(function() {

});
