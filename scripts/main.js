(function(){
  'use strict';

  var username = ''; // user will enter this into login screen


  $(document).ready(function(){

    routeUser();

    $(document).on('submit', '.login-form', function(event) {
      event.preventDefault();
      username = $(this).find('.login-form-username').val();
      window.location.hash = '/chat';
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
    console.log('render login called');
  }

  function renderChat() {
    $('.application').html(JST['chat']());
    console.log('username:' + username);
  }

})();
