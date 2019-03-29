var config = {
    apiKey: "AIzaSyCaN5XR0fvTivJQhLBXvxERgfFsN9L9iyQ",
    authDomain: "trains-51574.firebaseapp.com",
    databaseURL: "https://trains-51574.firebaseio.com",
    projectId: "trains-51574",
    storageBucket: "",
    messagingSenderId: "398506627878"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
      event.preventDefault();
      var trainRef = $("#trainName").val().trim();
      var whereTo = $("#destination").val().trim();
      var firstTime = moment($("#firstTrain").val().trim(), "HH:mm").format("HH:mm");
      var howOften = $("#frequency").val().trim();

      database.ref().on("child_added", function(childSnapshot) {
      })

    var addTrain = {
        name: trainRef,
        destination: whereTo,
        first: firstTime,
        frequency: howOften
    };

    database.ref().push(addTrain);

    $("#trainName").val('');
    $("#destination").val('');
    $("#firstTrain").val('');
    $("#frequency").val('');
  });

  database.ref().on("child_added", function(childSnapshot) {

  var trainRef = childSnapshot.val().name;
  var whereTo = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var howOften = childSnapshot.val().frequency;
  
  var newRow = $("<tr>").append(
      $("<td>").text(trainRef),
      $("<td>").text(whereTo),
      $("<td>").text(firstTrain),
      $("<td>").text(howOften)
  );

  $("#train-table > tbody").append(newRow);
  });
