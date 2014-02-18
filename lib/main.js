var data = require("sdk/self").data;
var jquery
var widgets = require("sdk/widget");
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

var widget = widgets.Widget({
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

// exports.main is called when extension is installed or re-enabled
exports.main = function(options, callbacks) {
  addToolbarButton();
  // do other stuff
};
 
// exports.onUnload is called when Firefox starts and when the extension is disabled or uninstalled
exports.onUnload = function(reason) {
  removeToolbarButton();
  // do other stuff
};
 
// add our button
function addToolbarButton() {
  // this document is an XUL document
  var document = mediator.getMostRecentWindow('navigator:browser').document;    
  var navBar = document.getElementById('nav-bar');
  if (!navBar) {
    return;
  }
  var btn = document.createElement('toolbarbutton');  
  btn.setAttribute('id', 'mybutton-id');
  btn.setAttribute('type', 'button');
  // the toolbarbutton-1 class makes it look like a traditional button
  btn.setAttribute('class', 'toolbarbutton-1');
  // the data.url is relative to the data folder
  btn.setAttribute('image', data.url('img/icon16.png'));
  btn.setAttribute('orient', 'horizontal');
  // this text will be shown when the toolbar is set to text or text and iconss
  btn.setAttribute('label', 'My Button');
  btn.addEventListener('click', function() {
    // do stuff, for example with tabs or pageMod
  }, false)
  navBar.appendChild(btn);
}
 
function removeToolbarButton() {
  // this document is an XUL document
  var document = mediator.getMostRecentWindow('navigator:browser').document;    
  var navBar = document.getElementById('nav-bar');
  var btn = document.getElementById('mybutton-id');
  if (navBar && btn) {
    navBar.removeChild(btn);
  }
}



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