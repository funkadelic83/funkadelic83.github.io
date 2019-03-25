//when the document loads
$(document).ready(function () {

//topics is set to an array of topics
var topics = ["kitties", "explosions", "puppies", "sunshine", "friday", "bernie sanders"];

//creates buttons
function newButtons() {
    console.log('hit');

//for each position in the array
    for (var i = 0; i < topics.length; i++) {
        console.log(topics);
//create a button
        var button = $("<button>");
//add a class of buttons, an attribute of "data-name", which is equal to the array position string, and a click handler
        button.addClass("button");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
  //on button click, empties the gifs display , then sends a query to the API based on the data-name.     
        button.on("click", function (event) {
            event.preventDefault();
            console.log("hit");
            $("#gifsDisplay").empty();
            var searchTerm = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                searchTerm + "&api_key=ZMzfUxIeJSf8gRQmhewiMSEl4chWthFV&limit=10";
    
            $.ajax({
                url: queryURL,
                method: "GET"
            })

    //when the data comes back, create a div with all the contents from the API
                .then(function (response) {
                    console.log(response)
                    var results = response.data;
                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div class='gifContainer'>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var gifImage = $("<img>");
                        gifImage.attr("src", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-state", "still")
                        gifImage.attr("data-animate", results[i].images.fixed_height.url);
                        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                        gifImage.addClass("gif");
                        gifDiv.append(p);
                        gifDiv.prepend(gifImage);
                        $("#gifsDisplay").append(gifDiv);
                    }

//on click, toggles between animate and still data states
    
                    $(".gif").on("click", function (event) {
                        event.preventDefault();
                        console.log("hit");
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else if (state === "animate") {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    }); 
                });
    
        });

//appends the button to the #buttonsDisplay div in HTML
        $("#buttonsDisplay").append(button);
    }
};

//calls newButtons
    newButtons();


//clears and re-creates every button when you click on the submit button
$("#add-gif").on("click", function (event) {
    $("#buttonsDisplay").empty();
    event.preventDefault();
    var addTopic = $("#gif-to-add").val().trim();
    topics.push(addTopic);
    newButtons();

})

})

