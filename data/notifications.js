

var cart_image= document.getElementById("cart");
var alert = document.getElementById("notification");
var notif_value = document.getElementById("number");

self.port.on("reset", function() {
  alert.src = "empty.png";
})
self.port.on("BINGO", function() {             //BINGO sent when match found
	alert.src = "alert.gif";
});