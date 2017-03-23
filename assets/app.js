$(document).ready(function() {



    // Initial array of random names

    var names = ["test", "alien", "wolverine", "beagle", "batman", "trump"];

    //===========================================================================

    // Function to display the data on page

    function renderButtons() {

        $("#buttons-view").empty();

        // looping thorugh the array of names

        for (var i = 0; i < names.length; i++) {

            // Dynamically generate buttons for the array 

            var a = $("<button class='btn btn-info name'>");


            // adding data-attribute 
            a.attr("data-state", names[i]);

            // adding text to the buttons 
            a.text(names[i]);

            // adding the button to the buttons-view div
            $("#buttons-view").append(a);


        }

    }

    //===========================================================================

    // Events when "add them in " button is clicked 

    $("#add-topic").on("click", function(event) {

        event.preventDefault();

        var topic = $("#topic-input").val().trim();

        // adding topic from text box to the array

        names.push(topic);

        // calling on the render buttons
        renderButtons();


    });

    //============================================================================


    // On click function re-renders the HTML to display the appropriate content


    $(document.body).on("click", ".name", function() {

        $("#gifs-view").empty();

        var name = $(this).attr("data-state");



        // Constructing a URL to search Giphy for the topic 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC&limit=12";

        console.log(queryURL);

        //Creating an AJAX call for a specific topic button to be clicked

        $.ajax({
            url: queryURL,
            method: "GET"
        })



        // after the data comes back from request
        .done(function(response) {


            console.log(response);


            // Storing data from Ajax request
            // var results = response.data;

            for (var i = 0; i < response.data.length; i++) {

                // Creating a Div to hold the selection
                var topicDiv = $("<div class='names'>");

                // Elemet to Store and display the rating info

                var p = $("<p>").text("Rating:" + response.data[i].rating);

                //Creating and storing the image tag

                var topicImage = $("<img class='gif'>");

                var stillURL = response.data[i].images.original_still.url;
                var animatedURL = response.data[i].images.original.url;

                // console.log(animatedURL);

                // Setting the attributes of the image to a property pulled off the result item

                topicImage.attr({
                    "src": stillURL,
                    "data-still": stillURL,
                    "data-animate": animatedURL,
                    "data-state": "still",

                    "class": "gif",
                });



                // topicImage.attr("src", response.data[i].images.original.url);

                // Appending the paragraph and image tag to the animalDiv

                topicDiv.append(p);
                topicDiv.append(topicImage);

                $("#gifs-view").prepend(topicDiv);

            }

            renderButtons();

        });


    });

    //========================================================================
    // Gif on click fuinction to play/pause the gifs


    $(document.body).on("click", ".gif", function() {

        var state = $(this).attr("data-state");



        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    renderButtons();



});
