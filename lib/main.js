var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var widgets = require("toolbarwidget");
var self = require("sdk/self");
var {Cc, Ci} = require('chrome');
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
var split;             //List of websites, separated by ';'


var text_entry = require("sdk/panel").Panel({
  width: 260,
  height: 125,
  contentURL: data.url("text-entry.html"),
  contentScriptFile: [data.url("get-text.js"),data.url("jquery.js")]
});


var widget = widgets.ToolbarWidget({
  toolbarID: "nav-bar",
  id: "text-entry",
  label: "Text entry",
  contentURL: data.url("widg.html"),
  contentScriptFile: [data.url("notifications.js"),data.url("jquery.js"),data.url("merchants.js")],
  contentScriptWhen: "ready",
  panel: text_entry,
  width: 25,
  contentScript: console.log("emitted")
  });

widget.port.on("url_list",function(list){
  split = list.split(";");          //list of websites
  console.log("retrieved url list in main.js");
});

tabs.on("ready", alert);
tabs.on("activate", alert);

function reset() {
  widget.port.emit("reset");
  text_entry.port.emit("reset");
}

function alert() {
  var url = "" + tabs.activeTab.url;    //url of current tab
  var title = tabs.activeTab.title;
  console.log("url: " + tabs.activeTab.url + "\ntitle: " + title);
  var message = "Sorry. No coupons Found";      //message displayed in popup
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
    if(url.indexOf(compare.toLowerCase())!=-1 && url.indexOf("shoppingbaba.in")==-1) {
      //For ambiguous cases on a single site ex. yatra
      if (merchant_data[0].indexOf("|")!=-1) {
      	if(title.toLowerCase().indexOf(merchant_data[0].split("|")[1].toLowerCase())==-1) {
      		continue;
      	}
      }
      flag = 1;
      message = merchant_data[1] + "," + merchant_data[2];
      console.log("match found at Index:" + i);
    }
  }
  if (flag == 1) {
    console.log(url);
    widget.port.emit("BINGO",message);
    text_entry.port.emit("change_content",message);
  }
  else { 
    reset();
  }
}


//Reset the alert and panel text on new tab open
tabs.on("open", reset);

//Clicked on the discount option in the panel
text_entry.port.on("gotourl", function(url) {
  text_entry.hide();
  console.log("URL change received");
  tabs.open(url);
});

