// When the user hits return, send the "text-entered"
// message to main.js.
// The message payload is the contents of the edit box.
var textArea = document.getElementById("content");

// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing.
self.port.on("change_content", function(message) {
  console.log("content changed");
  var array = message.split(",");
  var url = "http://shoppingbaba.in/stores/" + array[0];
  var text = array[1];
  textArea.innerHTML = "<a href=''>" + text + "</a>";
  $("#content").off("click").bind("click", function() {
  	console.log("Clicked");
  	self.port.emit("gotourl", url);
  });
});

self.port.on("reset", function() {
	textArea.innerHTML = "Sorry, No coupons found.";
});
