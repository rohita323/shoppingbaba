var s = "";
$(document).ready(function() {
	console.log("in here");
    $.getJSON('merchants.json', function(data) {
	    $.each(data.Websites, function(key, val) {
	    	s += val.url + ",";
	       console.log(val.url);
		});
	console.log(s);
    self.port.emit("url_list",s);
   });
    
 });
