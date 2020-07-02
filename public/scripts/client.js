$(document).ready(function() {

  // Escaping Cross-Site Scripting (XSS)

    // const escape =  function(str) {
    //   let div = document.createElement('div');
    //   div.appendChild(document.createTextNode(str));
    //   return div.innerHTML;
    // };

  // Creating a favorite listing HTML element

  // const createFavorite = function(favorite) {
  //   const createdFavorite = `
  //     <div class="one-listing" id='${favorite.listing_id}'>
  //     <div class="listing-info">
  //       <img src="${favorite.thumbnail_photo_url}" />
  //       <div>
  //         <div class="listing-parameters">
  //           <h3>${favorite.title}</h3>
  //           <div>
  //             <span>CAD ${favorite.price}</span>
  //             <span>Posted on: ${favorite.date}</span>
  //           </div>
  //         </div>
  //         <article class="listing-description">
  //           ${favorite.description}
  //         </article>
  //       </div>
  //     </div>
  //     <div class="listing-buttons">
  //       <form
  //         method="POST"
  //         action="/favorites/remove_favorite/${favorite.listing_id}"
  //         class="remove-favorite-form"
  //       >
  //         <button type="submit" class="button-favorite">
  //           <i class="fas fa-heart"></i>
  //         </button>
  //       </form>
  //       <form
  //         method="GET"
  //         action="/messages/listings/${favorite.listing_id}/messages/"
  //       >
  //         <button type="submit" class="new-message-button">
  //           Contact
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  //   <hr />
  //   `;
  //   return createdFavorite;
  // };

  // Adding the favourites to the existing base HTML

  // const renderFavorites = function (favorites) {
  //   for (let favorite of favorites) {
  //     const currentFavorite = createFavorite(favorite);
  //     $('#favorites-listings').append(currentFavorite);
  //   }
  // };

  // const renderFavorites2 = function (favorites) {

  //   const createFavorite = function(value) {
  //     const createdFavorite = `
  //       <div class="one-listing" id='${favorites[value].listing_id}'>
  //       <div class="listing-info">
  //         <img src="${favorites[value].thumbnail_photo_url}" />
  //         <div>
  //           <div class="listing-parameters">
  //             <h3>${favorites[value].title}</h3>
  //             <div>
  //               <span>CAD ${favorites[value].price}</span>
  //               <span>Posted on: ${favorites[value].date}</span>
  //             </div>
  //           </div>
  //           <article class="listing-description">
  //             ${favorites[value].description}
  //           </article>
  //         </div>
  //       </div>
  //       <div class="listing-buttons">
  //         <form
  //           method="POST"
  //           action="/favorites/remove_favorite/${favorites[value].listing_id}"
  //           class="remove-favorite-form"
  //         >
  //           <button type="submit" class="button-favorite">
  //             <i class="fas fa-heart"></i>
  //           </button>
  //         </form>
  //         <form
  //           method="GET"
  //           action="/messages/listings/${favorites[value].listing_id}/messages/"
  //         >
  //           <button type="submit" class="new-message-button">
  //             Contact
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //     <hr />
  //     `;
  //     return createdFavorite;
  //   };

  //   for (let favorite of favorites) {
  //     const currentFavorite = createFavorite(favorite);
  //     $('#favorites-listings').append(currentFavorite);
  //   }
  // };

  // Loading the favourites HTML after removing a listing from favourites

  // const loadFavorites = function() {
  //   $.ajax({
  //     url: '/myaccount',
  //     method: 'GET'
  //   })
  //     .then(function(response) {
  //       renderFavorites2(response);
  //     });
  // };

  // Showing or hiding the received messages on the messages page
  $('#show-messages-button').on('click', function() {
    $('.previous-message').slideToggle('fast');
  });

  // Showing or hiding the received messages on the user's page

  $('#show-messages-button').on('click', function() {
    $('#received-messages').slideToggle('fast');
  });

  // Showing or hiding the user's favourites on the user's page

  $('#show-favorites-button').on('click', function() {
    $('#favorites-container').slideToggle('fast');
    $('#favorites-filter-button').slideToggle('fast');
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
      // .then(console.log('working'));
  });

  // Removing from favourites on clicking the remove from favourites icon

  // Add empty container and render favourites to .then

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
      // .then(() => console.log(listingId))
      // .then(() => $(`#${listingId}`).hide('fast'));
      // .then(() => $(currentListing).slideUp('fast'));
      // .then($('#favorites-listings').empty())
      // .then(loadFavorites)
  });

  // Showing an alert when a message is sent

  $('#new-message-button').on('click', function() {
    alert('Your message has been sent!');
  });

})
