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

  // Calculate the next arrival time and how many minutes away
  var currentTime = moment();
  var currentTimeFormatted = moment(currentTime).format("HH:mm");

  // var firstTimeConverted = moment(firstTime, "hh:mm");
  var firstTimeConverted = moment(ftime, "HH:mm");

  console.log("Current Time: " + currentTimeFormatted);

  console.log("firebase: " + ftime);
  console.log("firstTimeConverted: " + firstTimeConverted);

  // Current Time - First Train of the Day
  var timeDiff = currentTime.diff(moment(firstTimeConverted), "minutes");
  console.log("time difference: " + timeDiff);

  // ex. trains starts at 3:00 AM, runs every 15 min. time is now 3:25 AM
  // current - first time = 25 min. Modulus 25 % 15, returns 10
  // out of the 15 minutes, 10 minutes has passed so 5 minutes until train comes
  var tRemainder = timeDiff % freq;
  console.log("time remaining: " + tRemainder);
  // figure out how many minutes until train arrives
  var tMinutesTillTrain = freq - tRemainder;
  // add above minutes to get the next train arrival
  var tNextTrain = moment().add(tMinutesTillTrain, "minutes");
  // format the above time
  var newtNextTrain = moment(tNextTrain).format("HH:mm");
  console.log("new next train: " + newtNextTrain);

  $("#trainScheduleArea").prepend("<tr><td>" + tname + "</td>" +
                                      "<td>" + dest + "</td>" +
                                      "<td>" + freq + "</td>" +
                                      "<td>" + newtNextTrain + "</td>" +
                                      "<td>" + tMinutesTillTrain +
                                      "</td></tr>");


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
