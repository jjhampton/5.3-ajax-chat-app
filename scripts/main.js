(function(){
  'use strict';

  var username = ''; // user will enter this into login form


  $(document).ready(function(){

    routeUser();

    $(document).on('submit', '.login-form', function(event) {
      event.preventDefault(); //prevent entire page from reloading
      username = $(this).find('.login-form-username').val();
      window.location.hash = '/chat';
    });

    $(document).on('submit', '.message-form', function(event) {
      var messageText;

      event.preventDefault(); //prevent entire page from reloading
      messageText = $(this).find('.message-form-textarea').val();
      addMessage(messageText);
    });

    $(window).on('hashchange', function(event) {
        //event.preventDefault(); Not needed? No default behavior for hashchange event?
        routeUser();
    });

  });

  function routeUser() {
    switch(window.location.hash) {
      case '':
        renderLogin();
        break;
      case '#/chat':
        renderChat();
        break;
    }
  }

  function renderLogin() {
    $('.application').html(JST['login']());
  }

  function renderChat() {

    $('.application').html(JST['chat']());

    $.ajax({
      url: "http://tiny-lasagna-server.herokuapp.com/collections/messages/"
    }).then(displayMessages);

    setInterval(function() {
      $.ajax({
        url: "http://tiny-lasagna-server.herokuapp.com/collections/messages/"
      }).then(displayMessages);
    }, 30000);
  }

  //Send AJAX
  function displayMessages(messages) {
    console.log(messages);
    $('.message-list').html(JST['message'](messages));
  }

  function addMessage(message) {
    var messageObject = {
      username: username,
      created_at: new Date(),
      content: message
    };

    $.ajax({
      type: 'POST',
      url: "http://tiny-lasagna-server.herokuapp.com/collections/messages/",
      data: messageObject,
    });
  }

})();
