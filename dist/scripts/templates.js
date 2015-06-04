this["JST"] = this["JST"] || {};
this["JST"]["application"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Test</h1>\n";
},"useData":true});
this["JST"]["chat"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Chat Room</h1>\n<section class=\"message-list\">\n</section>\n<form class=\"message-form\">\n  <textarea class=\"message-form-textarea\" name=\"message\" placeholder=\"Enter your message here...\"></textarea>\n  <input type=\"submit\" value=\"Submit message\">\n</form>\n";
},"useData":true});
this["JST"]["login"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Login Area</h1>\n<input class=\"login-form-username\" type=\"text\" placeholder=\"Enter username\">\n<form class=\"login-form\">\n  <h2>General Class Chatroom</h2>\n  <input class=\"login-form-submit\" type=\"submit\" value=\"Login to General Chatroom Here\">\n</form>\n<form class=\"newroom-login-form\">\n  <h2>Other Chatrooms</h2>\n  <p>You can enter other chatrooms too.  Enter the chat room name below to join an already existing chatroom.  To create a chat room that does not already exist, enter its name below and the new room will be created when you login.\n  </p>\n  <input class=\"login-form-roomname\" type=\"text\" placeholder=\"Enter chat room name here\">\n  <input class=\"login-form-submit\" type=\"submit\" value=\"Login to your chatroom here\">\n</form>\n";
},"useData":true});
this["JST"]["message"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<ul class=\"message-recieved\">\n  <li class=\"message-property\">Username: "
    + alias3(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"username","hash":{},"data":data}) : helper)))
    + "</li>\n  <li class=\"message-property\">Content: "
    + alias3(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "</li>\n  <li class=\"message-property\">Time: "
    + alias3((helpers.moment || (depth0 && depth0.moment) || alias1).call(depth0,(depth0 != null ? depth0.created_at : depth0),{"name":"moment","hash":{},"data":data}))
    + "</li>\n  <li class=\"message-property\">Message ID: "
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "</li>\n  <li class=\"message-property\">Room Name: "
    + alias3(((helper = (helper = helpers.roomname || (depth0 != null ? depth0.roomname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"roomname","hash":{},"data":data}) : helper)))
    + "</li>\n</ul>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.messages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});