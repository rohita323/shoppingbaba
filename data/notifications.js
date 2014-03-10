

var cart_image= document.getElementById("cart");
var alert = document.getElementById("notification");



self.port.on("reset", function() {
  alert.src = "empty.png";
});
self.port.on("BINGO", function() {             //BINGO sent when match found
	alert.src = "alerty.gif";
	//self.port.emit("change_content",message);
});