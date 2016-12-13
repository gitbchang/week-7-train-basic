// Initialize Firebase
$(document).ready(function(){


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




database.ref("/trainScheduleData").on("child_added", function(snapshot){
  var snapval = snapshot.val();
  var tname = snapval.trainName;
  var dest = snapval.destination;
  var ftime = snapval.firstTrainTime;
  var freq = snapval.frequency;



  // console.log(firebaseObject.trainName);
  // use stringify to turn firebase keys into array?
  // for(var x = 0; x< 5; x++){
  //
  // }



  $("#trainScheduleArea").prepend("<tr><td>" + tname + "</td>" +
                                      "<td>" + dest + "</td>" +
                                      "<td>" + freq + "</td>" +
                                      "<td>" + "Next Arrival" + "</td>" +
                                      "<td>" + "Minutes Away" + "</td></tr>");


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

  console.log(newTrainName);
  console.log(newDestination);
  console.log(newFirstTime);
  console.log(newFrequency);

  database.ref("/trainScheduleData").push({
    trainName: newTrainName,
    destination: newDestination,
    firstTrainTime: newFirstTime,
    frequency: newFrequency

  });

});


}); // end of document ready
