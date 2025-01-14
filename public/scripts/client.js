/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function(event) {
  // ---- error message ----
  // hiding the error message and tweet form at the start
  $('#error-message').hide();
  $('#tweet-form').hide();

  // hiding the error message after user clicks into text area
  $('#tweet-text').on('click', (event) => {
    $('#error-message').slideUp();
  });

  // making tweet form slide down when new tweet is clicked
  $('#error-message').slideUp();

  $('#new-tweet-button').on('click', (event) => {
    $("#tweet-form").slideToggle();
  });

  //adding tweets to database
  const renderTweets = function(tweets) {
    $('.all-tweets').empty() ///emptying the html, NOT THE JSON
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $('.all-tweets').prepend(newTweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let creation = timeago.format(tweet.created_at);
    let $tweet = `  
        <article>
          <header>
              <div id="tweet-header-left">
                <img src="${tweet.user.avatars}">
                <p>${tweet.user.name}</p>
              </div>
              <div id="tweet-header-right">
              <p>${tweet.user.handle}</p>
              </div>

          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <div>
              <p>${creation}</p>
            </div>
            <div class="symbols">
              <i class="fa-sharp fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
      `
    return $tweet;
  };


  // grabbing the form
  const $form = $('#tweet-form');

  // listen to the submit
  $form.on('submit', (event) => {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      let errorMsg = " uh-oh! You passed the 140 character limit."
      $('#error-message').html(errorMsg).slideDown();
      return
    }
    if ($('#tweet-text').val().length === 0) {
      let errorMsg = "uh-oh! That's a quiet tweet!";
      $('#error-message').html(errorMsg).slideDown();
      return;
    }

    //get the data from the form
    const dataToSend = $form.serialize(); //turn object into JSON

    //Form.serialize() will get all the values from the form controls like 
    //textboxes and convert it into an object with key value pair

    // send info to server via POST
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: dataToSend,
      success: function(result) {
        loadTweets();
        $('#error-message').slideUp();
      },
      error: function(err) {
        console.log("Some errror occurred ", err);
      }
    }); //AJAX CAll ends POST

    // resetting form and resetting counter
    $form.trigger('reset');
    $('#counter').html('140');

  }) //form.on close
  const loadTweets = () => {

    // const $button = $('.tweet-button')
    // $button.on('click', function() {
    $.ajax({
      method: 'GET', //read
      url: '/tweets',//the JSON file in initial-tweets
      // stringified json from data-helpers 20
      success: function(result) {
        renderTweets(result); //this function calls createTweet
      },
      error: function(err) {
        console.log("Some errror occurred ", err)
      }
    });
  };
  loadTweets();
}); //document load closing brackets




