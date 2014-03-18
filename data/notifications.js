

var cart_image= document.getElementById("cart");
var alert = document.getElementById("notification");



self.port.on("reset", function() {
  alert.src = "Images/empty.png";
});
self.port.on("BINGO", function() {             //BINGO sent when match found
	alert.src = "Images/alert.gif";
	//self.port.emit("change_content",message);
});