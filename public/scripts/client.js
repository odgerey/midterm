$(document).ready(function() {

  // Escaping Cross-Site Scripting (XSS)

    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

  // Showing or hiding the received messages on the user's page

  $('#show-messages-button').on('click', function() {
    $('#received-messages').slideToggle('fast');
  });

  // Showing or hiding the user's favourites on the user's page

  $('#show-favorites-button').on('click', function() {
    $('#favorites-container').slideToggle('fast');
  });

  // Changing the favourites button after clicking on it

  // toggleClass
  // $('#show-favorites-button').on('click', function() {
  //   $('#favorites-container').slideToggle('fast');
  // });

  // Adding to favourites on clicking the add to favourites button

  // $('#show-favorites-button').on('click', function() {
  //   $('#favorites-container').slideToggle('fast');
  // });
  // const loadTweets = function() {
  //   $.ajax({
  //     url: '/tweets',
  //     method: 'GET' (POST?)
  //   })
  //     .then(function(response) {
  //       renderTweets(response);
  //     });
  // };

});