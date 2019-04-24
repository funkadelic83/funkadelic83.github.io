$(function() {
    $(".devour-burger").on("click", function(event) {
        var id = $(this).data("id");
        // var devourThis = $(this).data("devourthis");
        var devourThis = 1;

        var devourThisState = {
            devoured: devourThis
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devourThisState
        }).then(
            function() {
                console.log("This burger has been devoured!", devourThis);
                location.reload();
            }
        );
    });  

$(".create-form").on("submit", function(event) {
    event.preventDefault();
    console.log("Submit button works");
    var newBurger = {
        burger_name: $("#burger-name").val().trim(),
        devoured: $("[name=devoured]:checked").val().trim()
    };
    console.log(newBurger);

    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(
        function() {
            console.log("Created a new burger");
            location.reload();
        }
    );
});




});