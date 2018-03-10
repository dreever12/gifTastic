    //initial array of foods
    var foodArray = ["fries", "steak", "corn", "ice cream"];


    function displayFoodInfo(food) {

      
     // queryURL for Giphy API
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&rating=&limit=10&api_key=bsGRLvF2KT4AShhUcjcxz9IL2rfCBEna";

    //displayGifs function re-renders the HTML in conjection to the appropriate content

      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(result) {
        //cl
        console.log(result);
        //make rating button then append to HTML
        //added 3/8
        var foodElem = $("<div class='food'>");

        for (var i = 0; i < result.data.length; i++) {
            var rating = result.data[i].rating;
            console.log(rating)

            var pOne = $("<p>").text("Rating: " + rating);
            foodElem.append(pOne);
            console.log(foodElem);
            //make giphy then append to HTML
            //added
            var imgGiphy =result.data[i].images.fixed_height.url;
            var image = $("<img>")
            image.attr("data-animated", imgGiphy);
            var stillGiphy =result.data[i].images.fixed_height_still.url;
            image.attr("src", stillGiphy); 
            image.attr("data-still", stillGiphy);
            image.attr("data-state", "still");     
            foodElem.append(image);
            //putting the entire food sec above the previous food section
            $("#food-view").prepend(foodElem);
          }
      });
    }

    renderButtons();

      function renderButtons() {
        $("#button-view").empty();
        // looping throught he food array and dynamically gen buttons
        //adding class, text, value to the looped food array buttons & adding to HTML
        //ADDED 3/8
        for (var i = 0; i < foodArray.length; i++) {
          var a = $("<button>");
          a.addClass("food-btn");
          a.attr("data-name", foodArray[i]);
          a.text(foodArray[i]);
          $("#button-view").append(a);
        }
      }

      $("#add-food").on("click", function(event) {
        event.preventDefault();

        var food = $("#food-input").val().trim();
        foodArray.push(food);
        renderButtons();
      });

      // adding a click event to all 
      $(document).on("click", ".food-btn", function(){
        $("#food-view").empty()
        displayFoodInfo($(this).attr("data-name"))
      });

      $(document).on("click", "img", function() {
        if ($(this).attr("data-state") === "still") {
          $(this).attr("src", $(this).attr("data-animated"));
          $(this).attr("data-state", "animated");
        }
        else if ($(this).attr("data-state") === "animated") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }

      });