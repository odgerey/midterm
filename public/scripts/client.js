$(document).ready(function() {

  // Escaping Cross-Site Scripting (XSS)

    // const escape =  function(str) {
    //   let div = document.createElement('div');
    //   div.appendChild(document.createTextNode(str));
    //   return div.innerHTML;
    // };

  // Showing or hiding the received messages on the user's page

  $('#show-messages-button').on('click', function() {
    $('#received-messages').slideToggle('fast');
  });

  // Showing or hiding the user's favourites on the user's page

  $('#show-favorites-button').on('click', function() {
    $('#favorites-container').slideToggle('fast');
    $('#favorites-filter-button').slideToggle('fast');
  });

  // Changing the favourites button after clicking on it

  // $('.button-favorite i').on('click', function() {
  //   $(event.target).toggleClass("fas fa-heart far fa-heart");
  // });

  // Adding to favourites on clicking the add to favourites button

  // Change to form instead of the button
  // $('form').on('submit', function(event) {
  //   event.preventDefault();
  // });

  $('.button-favorite i').on('click', function() {
    $(event.target).toggleClass("fas fa-heart far fa-heart");
    // $(event.target).removeClass("fas fa-heart far fa-heart");


    // $.ajax({
    //   url: '/remove_favorite/:id',
    //   method: 'POST'
    // })
    //   .then(console.log('working'));


    $.ajax({
      url: '/listings/add_favorite/:listingID',
      method: 'POST'
    })
      .then(console.log('working'));
  });

  // Showing an alert when a message has been sent

  $('#new-message-button').on('click', function() {
    alert('Your message has been sent!');
  });

  // Using from now for the date.
  $moment(listings.created_at, "").fromNow();

});
