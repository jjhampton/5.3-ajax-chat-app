(function(){
  'use strict';

  $(document).ready(function(){
    $(".login-form").on("submit", function(event) {
      event.preventDefault();
      window.location.hash = "/chat";
    });

    $(window).on("hashchange", function(event) {
        //event.preventDefault();
        console.log(window.location.hash)
    });

  });

})();
