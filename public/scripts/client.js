$(document).ready(function() {

  // Hiding the received messages by default when loading the user's page

  $('#received-messages').fadeOut('fast');

  // Showing or hiding the received messages on the messages page

  $('#show-messages-button').on('click', function() {
    $('.previous-message').fadeToggle('fast');
  });

  // Showing or hiding the received messages on the user's page

  $('#show-messages-button').on('click', function() {
    $('#received-messages').fadeToggle('fast');
  });

  // Showing or hiding the user's favourites on the user's page

  $('#show-favorites-button').on('click', function() {
    $('#favorites-container').fadeToggle('fast');
    $('#favorites-filter-button').fadeToggle('fast');
  });

  // Adding to favourites on clicking the add to favourites icon

  $('.add-favorite-form').on('submit', function(event) {

    event.preventDefault();

    const icon = $(event.target).find('.button-favorite i');
    $(icon).removeClass("far fa-heart").addClass("fas fa-heart");
    // $(event.target).toggleClass("fas fa-heart far fa-heart");

    const currentListing = $(event.target).closest('.one-listing');
    const listingId = $(currentListing).attr("id");

    $.ajax({
      url: `/favorites/add_favorite/${listingId}`,
      method: 'POST',
    })
  });

  // Removing from favourites on clicking the remove from favourites icon

  $('.remove-favorite-form').on('submit', function(event) {

    event.preventDefault();

    const icon = $(event.target).find('.button-favorite i');
    $(icon).removeClass("fas fa-heart").addClass("far fa-heart");
    // $(event.target).toggleClass("fas fa-heart far fa-heart");

    const currentListing = $(event.target).closest('.one-listing');
    const listingId = $(currentListing).attr("id");

    $.ajax({
      url: `/favorites/remove_favorite/${listingId}`,
      method: 'POST',
    })
      // .then(() => $(currentListing).fadeOut('fast'));
      // .then($('#favorites-listings').empty())
      // .then(loadFavorites)
  });

  // Showing an alert when a message is sent

  $('#new-message-button').on('click', function() {
    alert('Your message has been sent!');
  });

  // Checking and showing an error if the fields are empty when submitting a new listing form

  // $('#new-listing-form').on('submit', function(event) {

  //   event.preventDefault();

  //   let input = $('textarea').val();

  //   if (!input) {
  //     $('.error').slideUp('fast');
  //     $('.error').html('Please fill in the fields for the new listing :)');
  //     $('.error').slideDown('fast');
  //   } else {
  //     $('.error').slideUp('fast');
  //     $.ajax({
  //       url: '/listings/new_listing',
  //       method: 'POST',
  //       // data: $(this).serialize(),
  //     })
  //       .then($('textarea').val(""))
  //       .then($.ajax({
  //         url: '/listings',
  //         method: 'GET',
  //       }));
  //   }

    // $("#new-listing-form").on("submit", function (event) {
    //   let input = $("textarea").val();
    //   if (!input) {
    //     event.preventDefault();
    //     $(".error").slideUp("fast");
    //     $(".error").html("Please fill in the fields for the new listing :)");
    //     $(".error").slideDown("fast");
    //   }
    // });

  // });

    // Checking and showing an error if the fields are empty when submitting an edit listing form

    // $('#edit-listing-form').on('submit', function(event) {

    //   event.preventDefault();

    //   let input = $('textarea').val();

    //   if (!input) {
    //     $('.error').slideUp('fast');
    //     $('.error').html('Please fill in the fields for your listing :)');
    //     $('.error').slideDown('fast');
    //   } else {
    //     $('.error').slideUp('fast');
    //     $.ajax({
    //       url: '/listings/edit_listing/<%=product.id%>',
    //       method: 'POST',
    //       // data: $(this).serialize(),
    //     })
    //       .then($('textarea').val(""))
    //       // .then($.ajax({
    //       //   url: '/listings',
    //       //   method: 'GET',
    //       // }));
    //   }

    // });

})
