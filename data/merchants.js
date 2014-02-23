var s = "";
$(document).ready(function() {
	console.log("in here");
    $.getJSON('merchants_list.json', function(data) {
	    $.each(data.Websites, function(key, val) {
	    	s += val.merchant_name + "," + val.url_name + "," + val.merchant_details + ";";
	       //console.log(val.url);
		});
	//console.log(s);
    self.port.emit("url_list",s);
   });
    
 });
