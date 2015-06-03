this["JST"] = this["JST"] || {};
this["JST"]["application"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Test</h1>\n";
},"useData":true});
this["JST"]["chat"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h1>Chat Room</h1>\n<ul class=\"message-list\"></ul>\n<form class=\"message-form\">\n  <textarea class=\"message-form-textarea\" name=\"message\">Enter your message here...</textarea>\n  <input type=\"submit\" value=\"Submit message\">\n</form>\n";
},"useData":true});
this["JST"]["login"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<form class=\"login-form\">\n  <input class=\"login-form-username\" type=\"text\" placeholder=\"Enter username\">\n  <input type=\"submit\" value=\"Login Here\">\n</form>\n";
},"useData":true});