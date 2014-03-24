var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var widgets = require("toolbarwidget");
var self = require("sdk/self");
var workers = require("sdk/content/worker");
var {Cc, Ci} = require('chrome');
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
var split = new Array(); 
var ready = 0;
var change = false;

function get_json(url, callback) {
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            var response = JSON.parse(body);
// call function ----v
            callback(response);
        });
    });
}

var mydata = get_json("https://raw.github.com/rohita323/shoppingbaba/master/data/merchants_list.json", function (resp) {
    	var website = resp[0];
    	split = [];
    	for(var i=0;i<website.length;i++) {
    		var obj = website[i];
    		var json = "";
    		for(var key in obj) {
    			json += obj[key] + ",";
    		}
    		split.push(json);	
    	}
    	
    }
});

var pageMod = require("sdk/page-mod");
   pageMod.PageMod({
     include: "*",
     contentScriptFile: [data.url("content.js"),data.url("jquery.js")],
     contentScriptWhen: "ready",
     contentScriptOptions: {
<<<<<<< Updated upstream
	   image_url: data.url("logo.png"),
     tab_url: data.url("pop-up.png")
=======
	    image_url: data.url("logo.png"),
        tab_url: data.url("pop-up.png"),
        split: split;
>>>>>>> Stashed changes
	  }
   });

/*
var text_entry = require("sdk/panel").Panel({
  width: 260,
  height: 125,
  contentURL: data.url("text-entry.html"),
  contentScriptFile: [data.url("get-text.js"),data.url("jquery.js")]
});
*/

var widget = widgets.ToolbarWidget({
  toolbarID: "nav-bar",
  id: "text-entry",
  label: "Shopping Baba",
  contentURL: data.url("widg.html"),
  contentScriptFile: [data.url("notifications.js")],
  contentScriptWhen: "ready",
  width: 25
  });



//Event Handlers
tabs.on("ready", alert);
tabs.on("activate", alert);


//Reset the alert and panel text on new tab open
tabs.on("open", reset);


function reset() {
  console.log("Logo: " + data.url("logo.png"));
  widget.port.emit("reset");
  //text_entry.port.emit("reset");
}



function alert() {
  var url = "" + tabs.activeTab.url;    //url of current tab
  var title = tabs.activeTab.title;
  
  var flag = 0;                     // flag=1 when website matches list of options
  
  for (var i=0; i<split.length-1; i++) {

  	var merchant_data = split[i].split(",");
  	var compare;                //to check with the url
  	
    if(merchant_data[0].indexOf("|")!=-1) {
  		compare = merchant_data[0].split("|")[0];
  	}
  	else {
  		compare = merchant_data[0];
  	}
    compare += ".";
    if(url.indexOf(compare.toLowerCase())!=-1 && url.indexOf("shoppingbaba.in")==-1) {
      flag = 1;
    }
  }
  if (flag == 1) {
    //console.log(url);
    widget.port.emit("BINGO");
  }
  else { 
    reset();
  }
}






