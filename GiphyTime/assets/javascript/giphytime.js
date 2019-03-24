var topics = ["kitties", "explosions", "puppies", "sunshine", "friday", "bernie sanders"];

$(document).ready(function () {
    $("#buttonsDisplay").empty();
    for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("buttons");
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $("#buttonsDisplay").append(buttons);
    }

    $(".buttons").on("click", function () {
        $("#gifsDisplay").empty();
        var searchTerm = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=ZMzfUxIeJSf8gRQmhewiMSEl4chWthFV&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
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
                        $(".gif").on("click", function() {
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
    })
    
    


});


