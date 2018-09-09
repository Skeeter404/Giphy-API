$(document).ready(function() {

var careers=["Astronaut", "Police", "Biologist", "Information Technology"];
 

//function to render buttons from careers variable
function renderButtons() {

    $("#buttons").empty();

    for (var i = 0; i < careers.length; i++) {

      var a = $("<button>");

      a.addClass("career-btn");
      
      a.attr("data-name", careers[i]);
      
      a.text(careers[i]);
      
      $("#buttons").append(a);
    }
  };

  //function to add buttons upon user input and search
  $("#add-career").on("click", function(event) {
    event.preventDefault();

    var career = $("#career-input").val().trim();

    careers.push(career);

    renderButtons();
  });

  //function to display info in gifContainer upon click of buttons
  function displayGifs(){

    var career = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + career + "&api_key=nX1sYpsvb1rx9f1bl79H3OtQMogfg9HC&limit=10";

    //ajax call
    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){

        var results = response.data;

        //looping through each gif result
        for(var i = 0; i < results.length; i++){

            //if statement to only display appropriate gifs
            if(results[i].rating !== "r" && results[i].rating !== "pg-13"){

                //creating div to hold each result
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;
  
                var p = $("<p>").text("Rating: " + rating);

                p.addClass("rating");
  
                var careerImage = $("<img>");

                careerImage.attr("src", results[i].images.fixed_height_still.url);
                careerImage.attr("data-still", results[i].images.fixed_height_still.url);
                careerImage.attr("data-animate", results[i].images.fixed_height.url);
                careerImage.attr("data-state", "still");
                careerImage.addClass("gif");

                //append rating and image to new div
                gifDiv.append(p);
                gifDiv.append(careerImage);
  
                //prepend the whole gifDiv to the container where the gifs are held
                $("#gif-container").prepend(gifDiv);
            }
        }
    });
  };

  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  function animateGifs() {
    
    var state = $(this).attr("data-state");
    console.log(state);
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

  //recognize click on any gif on the page
  $(document).on("click", ".gif", animateGifs);

  //recognize click on any button on the page
  $(document).on("click", ".career-btn", displayGifs);

  //calling function to render initial buttons.
  renderButtons();

});