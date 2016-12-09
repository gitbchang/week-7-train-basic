// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOKiDoDUYN39d3AZN2isGTaCPQUzIcE20",
    authDomain: "my-first-firebase-42f62.firebaseapp.com",
    databaseURL: "https://my-first-firebase-42f62.firebaseio.com",
    storageBucket: "my-first-firebase-42f62.appspot.com",
    messagingSenderId: "603749747113"
  };

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// --------------------------------------------------------------
// Link to Firebase Database for viewer tracking
// database reference for us
var connectionsRef = database.ref("/connections");
// database reference for everyone
var connectedRef = database.ref(".info/connected");



database.ref("/trainScheduleData").on("value", function(snapshot){



},
function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#submitButton").on("click", function(){
  console.log("hello");

  var newTrainName = $("#trainNameInput").val().trim();
  var newDestination = $("#destinationInput").val().trim();
  var newFirstTime = $("#firstTimeInput").val().trim();
  var newFrequency = $("#frequencyInput").val().trim();


  database.ref("/trainScheduleData").set({
    trainName: newTrainName,
    destination: newDestination,
    firstTrainTime: newFirstTime,
    frequency: newFrequency

  });

});
