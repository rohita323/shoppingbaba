$(document).ready(function() {
	console.log("in here");
    $.getJSON('merchants.json', function(data) {
        console.log("read");
	    $.each(data.Websites, function(key, val) {
	   	console.log(val.url);
	});
   });
 });