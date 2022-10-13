/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(event) {
  const renderTweets = function(tweets) {
    $('.all-tweets').empty()
    for (let tweet of tweets) {
      console.log(tweets)
      let newTweet = createTweetElement(tweet)
      console.log(newTweet)
      $('.all-tweets').prepend(newTweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  }
  const createTweetElement = function(tweet) {
    let creation = timeago.format(tweet.created_at)
    let $tweet = `  
        <article>
          <header>
          <img src="${tweet.user.avatars}">
            <p>${tweet.user.name}</p>
          </header>
          <p>${tweet.content.text}</p>
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
    return $tweet
  }

  // grabbing the form
  const $form = $('#tweet-form');

  // listen to the submit
  $form.on('submit', (event) => {
    event.preventDefault();
    if ($('#tweet-text').val().length > 140) {
      alert('Your tweet is too long!')
      return
    }
    if ($('#tweet-text').val().length === 0) {
      alert('Your tweet is empty!')
      return
    }

    //get the data from the form
    const dataToSend = $form.serialize();
    //Form.serialize() will get all the values from the form controls like 
    //textboxes and convert it into an object with key value pair

    // send info to server via POST
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: dataToSend,
      success: function(result) {
        loadTweets()
        console.log("Successs", result);
      },
      error: function(err) {
        console.log("Some errror occurred ", err);
      }
    }); //AJAX CAll ends POST

  }) //form.on close
  const loadTweets = () => {

    // const $button = $('.tweet-button')
    // $button.on('click', function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(result) {
        renderTweets(result); //this function calls createTweet
      },
      error: function(err) {
        console.log("Some errror occurred ", err)
      }
    })
  }
  loadTweets()
}) //document load
// fetching the tweets:



