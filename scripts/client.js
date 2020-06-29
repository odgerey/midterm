$('document').ready(function() {

  console.log('working');

  // Escaping Cross-Site Scripting (XSS)

    // const escape =  function(str) {
    //   let div = document.createElement('div');
    //   div.appendChild(document.createTextNode(str));
    //   return div.innerHTML;
    // };

  // Showing or hiding the received messages on the user's page

  $('#show-messages-button').on('click', function() {
    // $('#show-messages-button').next('#received-messages');
    // $('#show-messages-button').next().slideToggle('fast');
    $('#received-messages').slideToggle('fast');
  });

  // Showing or hiding the user's favourites on the user's page

  $('#show-favorites-button').on('click', function() {
    $('#show-favorites-button').next('#favorites-container');
    $('#favorites-container').slideToggle('fast');
  });

});
