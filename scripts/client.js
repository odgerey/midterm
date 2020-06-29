$('document').ready(function() {

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

  $('#my-account-button').on('click', function() {
    location.href = "/users/:id";
  });
});
