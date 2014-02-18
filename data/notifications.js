

var cart_image= document.getElementById("cart");
var red_circle = document.getElementById("notification");
var notif_value = document.getElementById("number");


self.port.on("not_number", function(number) {
	console.log(number);
  if(number==0)
  {
  	red_circle.src=("empty.png");
  	notif_value.innerHTML="";
  }

  else
  {
  	red_circle.src=("circle.png");
  	notif_value.innerHTML=number;
  }
});