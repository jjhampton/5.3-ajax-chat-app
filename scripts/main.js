(function(){
  'use strict';

  var username = ''; // user will enter this into login form
  var roomName = 'messages';
  var userEmail; //for getting Gravatar
  var messageUpdateInterval;


  $(document).ready(function(){

    routeUser();


    //add event handler to submit event for main chat room login
    $(document).on('submit', '.login-form', function(event) {
      //prevent entire page from reloading
      event.preventDefault();
      //get username from HTML login form
      username = $('.login-form-username').val();
      //save username in Local Storage in case of page refresh
      userEmail = $('.login-form-email').val();
      localStorage.setItem('loggedInUsername', username);
      //change hash property to /chat to assist with view change
      window.location.hash = '/chat';
    });

    //add event handler to submit event for other chat rooms
    $(document).on('submit', '.newroom-login-form', function(event) {
      //prevent entire page from reloading
      event.preventDefault();
      username = $('.login-form-username').val();
      userEmail = $('.login-form-email').val();
      roomName = $(this).find('.login-form-roomname').val();
      console.log(roomName);
      //save username in Local Storage in case of page refresh
      localStorage.setItem('loggedInUsername', username);
      //change hash property to /chat to assist with view change
      window.location.hash = '/newroom';
    });

    //adds event handler to submit event for message form on chat page
    $(document).on('submit', '.message-form', function(event) {
      var messageText;

      event.preventDefault(); //prevent entire page from reloading
      messageText = $(this).find('.message-form-textarea').val();
      addMessage(messageText);
      $(this).find('.message-form-textarea').val("");
    });

    //adds event handler to hash property change - will happen after chat room logins submitted
    $(window).on('hashchange', function(event) {
        //event.preventDefault(); Not needed? No default behavior for hashchange event?
        routeUser();
    });

  });

  //after hash change, routes window location to functions which will display different views
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

  //sets .application <div> contents to login template
  function renderLogin() {
    $('.application').html(JST['login']());
  }

  //sets .application <div> to chat template and performs other tasks to manage running of chat view
  function renderChat(roomName) {
    $('.application').html(JST['chat']()); //adds chat template to page

    //checks to see if interval is running
    if (typeof messageUpdateInterval !== "undefined") {
      console.log("clear condition called");
      //clears interval
      clearInterval(messageUpdateInterval);
    }

    // GET request for messages from designated server roomname, data recieved piped into displayMessages
    $.ajax({
      url: "http://tiny-lasagna-server.herokuapp.com/collections/" + roomName + "/"
    }).then(displayMessages);

    // sets interval to perform GET request above every 30 seconds, assigns to variable to enable clearing of interval later
    messageUpdateInterval = setInterval(function() {
      $.ajax({
        url: "http://tiny-lasagna-server.herokuapp.com/collections/" + roomName + "/"}).then(displayMessages);
    }, 10000);
    console.log("setinterval with" + roomName);
  }

  //adds message template w/ context to message list within chat template already on HTML page
  function displayMessages(messages) {
    console.log(messages);
    $('.message-list').html(JST['message']({
      messages: messages,
      roomname: roomName
      }));
  }

  //event handler function
  function addMessage(message) {
    var messageObject = {
      //retrieve username from Local Storage
      username: localStorage.getItem("loggedInUsername"),
      created_at: new Date(),
      content: message,
      roomname: roomName,
      gravatar: getGravatar(userEmail)
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

  function getGravatar(email) {
    console.log(email);
    var imgURL;
    // var newEmail = email.toString().trim().toLowerCase();

    var hash = CryptoJS.MD5(email).toString();
    console.log(hash);
    imgURL = "http://gravatar.com/avatar/" + hash;
    return imgURL;
  }

})();
