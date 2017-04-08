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

firebaseRefData.on('child_added', snap => {
  var trails = snap.child("trailName").val();
  $("#trail").append("<option>" + trails + "</option>");
});
