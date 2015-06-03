(function(){
  'use strict';

  var username = ''; // user will enter this into login form
  var message = ''; //user will enter this into chat message form


  $(document).ready(function(){

    routeUser();

    $(document).on('submit', '.login-form', function(event) {
      event.preventDefault(); //prevent entire page from reloading
      username = $(this).find('.login-form-username').val();
      window.location.hash = '/chat';
    });

    // $(document).on('submit', '.message-form', function(event) {
    //   event.preventDefault(); //prevent entire page from reloading
    //   message = $(this).find('.message-form-textarea').val();
    //   addMessage(message);
    // });

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
    console.log('render login called');
  }

  function renderChat() {
    var messageList; // list of messages received from server

    $('.application').html(JST['chat']());
    console.log('username:' + username);

    $.ajax({
      url: "http://tiny-lasagna-server.herokuapp.com/collections/messages/"
    }).then(displayMessages);
  }

  //Send AJAX
  function displayMessages(messages) {
    console.log(messages);
    $('.message-list').html(JST['message'](messages));
  }

  // function addMessage() {
  //
  // }

})();
