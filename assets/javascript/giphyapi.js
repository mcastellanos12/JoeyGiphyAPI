

$(document).ready(function() {
    // array of words to include in pre-made buttons
    var words = ['stressed', 'tired', 'excited', 'exhausted', 'happy'];

    //generateButtons function to display word data 
    function generateButtons() {
        // Deletes the words prior to adding new word
        $('#wordView').empty();

        // forLoop to loop through the array of words
        for (var i = 0; i < words.length; i++) {
            // generate buttons for each topic in the array

            // jQUery to create the new buttons - copied from class assignment  
            var a = $('<button type="button">') //Add button
            a.addClass('wordButton'); // Add class for button
            a.addClass('btn btn-primary'); // Add a class 
            a.attr('data-name', words[i]); // Add a data-attribute
            a.text(words[i]); // Provided the initial button 
            $('#wordView').append(a); // Append the button
        }
    }

  
    // on click function for when a button is clicked
    $('#addTopic').on('click', function() {

        console.log('button clicked');


        // grab input from the textbox when user types in word
        var newWord = $('#topicInput').val().trim();

        console.log(newWord);
        if (newWord != "") {
            // add word to array
            words.push(newWord);
            generateButtons();
        } else {
            $('#topicInput').attr("placeholder", "Please enter a topic to search.")
            generateButtons();
        }


      
        return false;
    });


    //Function for displaying gifs (Dynamic Elements assignment)
    function displaytopicGif() {

        $('#gifView').empty();
        var newWord = $(this).attr('data-name'); // grab and store the data-word property from the button
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newWord + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0"; 

        //performing an AJAX request with the queryURL (Dynamic Elements assignment) 
        $.ajax({ 
            url: queryURL, 
            method: 'GET' 

            })
            
            .done(function(response) {
                console.log(queryURL);

                console.log(response);

                // Create and store a div tag , will use for rating too(Dynamic Elements assignment)
                var topicDiv = $('<div class="topicImage">');
                console.log(response);

                //looping through each result item
                for (i = 0; i < response.data.length; i++) {
                    
                    var stillImage = response.data[i].images.fixed_height_still.url;
                   
                    var playImage = response.data[i].images.fixed_height.url;
                    
                    var rating = response.data[i].rating;
                   

                    // Create a paragraph tag with the result item's rating and appending the paragraph (Dynamic Elements assignment)
                    var p = $('<p>').text("Rating: " + rating.toUpperCase());
                    topicDiv.append(p);


                    // creating and storing an image tag and setting the src attribute of the image to a property pulled off the result item
                    var image = $("<img>").attr("src", stillImage); 

                    image.attr("playsrc", playImage); //Creates playsrc attr and passes moving gif link to the image playsrc
                    image.attr("stopsrc", stillImage); //Creates stopsrc attr and passes still image link to the image stopsrc

                    //appending the image tag to the topicDiv
                    topicDiv.append(image);

                    // Prepending the topicDiv to the HTML page in the gifView Div (Dynamic Elements assignment)
                    $('#gifView').prepend(topicDiv);

                    image.addClass('playClickedGif'); // Added a class to image tag


                }
            });
    }
    // function to start and stop gifs from playing
    function controlGif() {
       
        var playImage = $(this).attr('playsrc');
        var stopImage = $(this).attr('stopsrc');

      
        //if still then play, if play then still 
        if ($(this).attr('playsrc') == $(this).attr('src')) {
            //This changes the image src
            $(this).attr('src', stopImage);
        } else {
            $(this).attr('src', playImage);
        }
    }

    
    // This function calls the generateButtons() function and displays the gifs
    generateButtons();

    $(document).on('click', '.wordButton', displaytopicGif);
    $(document).on('click', '.playClickedGif', controlGif);




});
