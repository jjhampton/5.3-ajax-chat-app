(function(){
  'use strict';

  var username = ''; // user will enter this into login form
  var roomName = 'messages';
  var messageUpdateInterval;


  $(document).ready(function(){

    routeUser();

    $(document).on('submit', '.login-form', function(event) {
      //prevent entire page from reloading
      event.preventDefault();
      username = $('.login-form-username').val();
      //save username in Local Storage in case of page refresh
      localStorage.setItem('loggedInUsername', username);
      window.location.hash = '/chat';
    });

    $(document).on('submit', '.newroom-login-form', function(event) {
      //prevent entire page from reloading
      event.preventDefault();
      username = $('.login-form-username').val();
      roomName = $(this).find('.login-form-roomname').val();
      console.log(roomName);
      //save username in Local Storage in case of page refresh
      localStorage.setItem('loggedInUsername', username);
      window.location.hash = '/newroom';
    });

    $(document).on('submit', '.message-form', function(event) {
      var messageText;

      event.preventDefault(); //prevent entire page from reloading
      messageText = $(this).find('.message-form-textarea').val();
      addMessage(messageText);
      $(this).find('.message-form-textarea').val("");
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
        renderChat(roomName);
        break;
      case '#/newroom':
        renderChat(roomName);
        break;
    }
  }

  function renderLogin() {
    $('.application').html(JST['login']());
  }

  function renderChat(roomName) {
    $('.application').html(JST['chat']());
    if (typeof messageUpdateInterval !== "undefined") {
      console.log("clear condition called");
      clearInterval(messageUpdateInterval);
    }

    $.ajax({
      url: "http://tiny-lasagna-server.herokuapp.com/collections/" + roomName + "/"
    }).then(displayMessages);

    messageUpdateInterval = setInterval(function() {
      $.ajax({
        url: "http://tiny-lasagna-server.herokuapp.com/collections/" + roomName + "/"}).then(displayMessages);
    }, 10000);
    console.log("setinterval with" + roomName);
  }


  //Send AJAX
  function displayMessages(messages) {
    console.log(messages);
    $('.message-list').html(JST['message']({messages}));
  }

  function addMessage(message) {


    var messageObject = {
      //retrieve username from Local Storage
      username: localStorage.getItem("loggedInUsername"),
      created_at: new Date(),
      content: message,
      roomname: roomName
    };

    $.ajax({
      type: 'POST',
      url: "http://tiny-lasagna-server.herokuapp.com/collections/" + roomName + "/",
      data: messageObject,
    }).then(function() {
      $.ajax({
        url: "http://tiny-lasagna-server.herokuapp.com/collections/" + roomName + "/"
      }).then(displayMessages);
    });


  }

  Handlebars.registerHelper('moment', function(date){
      var result = moment(date).format('h:mma, ddd D MMMM YYYY');
      return new Handlebars.SafeString(result);
    });

})();
