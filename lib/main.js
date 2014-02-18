var data = require("sdk/self").data;
var jquery
var widgets = require("toolbarwidget");
var self = require("sdk/self");
var {Cc, Ci} = require('chrome');
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);


var number=3;


var text_entry = require("sdk/panel").Panel({
  width: 212,
  height: 200,
  contentURL: data.url("text-entry.html"),
  contentScriptFile: data.url("get-text.js")
});

var widget = widgets.ToolbarWidget({
  toolbarID: "nav-bar",
  id: "text-entry",
  label: "Text entry",
  contentURL: data.url("widg.html"),
  contentScriptFile: [data.url("notifications.js"),data.url("jquery.js"),data.url("merchants.js")],
  contentScriptWhen: "ready",
  panel: text_entry,
  width: 25,
  onAttach: function(worker) {
    worker.port.emit("not_number", number);  
  }  
  });


// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});
// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
text_entry.port.on("text-entered", function (text) {
  console.log(text);
  text_entry.hide();
});