var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var widgets = require("toolbarwidget");
var self = require("sdk/self");
var workers = require("sdk/content/worker");
var {Cc, Ci} = require('chrome');
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
var split = ['Myntra,myntra,Flat Rs.200 Cashback', 'Jabong,jabong,Flat 7% Cashback', 'Fashionara,fashionara,Upto Rs 170 Cashback', 'Babyoye,babyoye,Upto Rs 230 Cashback', 'Adlabs imagica,adlabs_imagica,Rs 170 per sale', 'Basics life,basics,Upto Rs 350 Cashback', 'Daily Objects,Daily_Objects,Rs 120 per sale', 'Expedia Hotels,Expedia_Hotels,6% per sale on hotels', 'Expedia Buses,expedia,Rs 30 per sale on buses', 'Expedia Flights,Expedia_Flights,0.5% per sale on flights', 'Fab furnish,fabfurnish,6% per sale', 'frens and petals,frensandpetals,12% per sale', 'fetise,fetise,8% per sale', 'floweraura,floweraura,12% per sale', 'Foodpanda,foodpanda,Upto Rs 160 Cashback', 'futurebazaar,futurebazaar,Upto Rs 90 Cashback', 'gaadi,gaadi,12% per sale', 'Globus,globus,No Cash Back Available Yet', 'go air,goair,No Cash Back Available Yet', 'gobol,gobol,1% per sale', 'godaam,godaam,Rs 140 per sale', 'greendust,greendust,Upto Rs 1000 Cashback', 'greetzap|voice,greetzap,10% per sale on voice cards', 'greetzap|flowers,greetzap_flowers,10% per sale on flowers & gifts', 'Homeshop18,homeshop18,Upto 8% Cashback', 'Hotels.com,hotels,6% per sale Cashback', 'indiacircus,indiacircus,Rs 170 per sale cashback', 'indiarush,indiarush,Rs 100 per sale cashback', 'shopping.indiatimes,indiatimesshopping,4% flat', 'Inkfruit,inkfruit,Rs 127 Cashback', 'Justeat,justeat,Rs 153 Cashback ', 'Lenskart,lenskart,Rs 90 Cashback', 'watchkart,watchkart,Rs 90 Cashback', 'bagskart,bagskart,Rs 90 Cashback', 'Jewelskart,jewelskart,Rs 90 Cashback', 'limeroad,limeroad,Rs 240 Cashback', 'masticart,masticart,Rs 170 Cashback', 'moodsofcloe,moodsofcloe,Rs 200 Cashback', 'naaptol,naaptol,Rs 212 Cashback', 'Shop at disney,shopatdisney, 6.80% Cashback', 'freedomtree,freedomtree,4% Cashback', 'Tata McGraw Hills,Tata_McGraw_Hills,6.80%  Cashback', 'pepperfry,pepperfry,Upto Rs 6.40% Cashback', 'policy advisor,policy_advisor,Rs  48 Cashback per lead', 'Printland.in,printland,12% Cashback', 'printvenue,printvenue,Rs 85 Cashback', 'zovi,zovi, Rs 195 Cashback', 'zivame,zivame,Rs 340 Cashback', 'yepme,yepme,9.6 % Cashback', 'yebhi,yebhi,8% Cashback', 'yatra|Hotels,yatraHotels,Rs 850 Cashback on Hotels', 'yatra|Domestic Flights,Yatra_Domestic_Flights,Rs 191 On domestic flights', 'yatra|international flights,yatra_international_flights,Rs 382 on international flights', 'vistaprint,vistaprint,Rs 200 Cashback', 'trendIN,trendIN,Rs 224 Cashback ', 'Travelguru,travelguru,Rs 510 Cashback', 'suratdiamond,suratdiamond,8.5% Cashback ', 'starCJ,starCJ,Rs 40 Cashback', 'snapdeal,snapdeal,Upto Rs 330 Cashback', 'shopclues,shopclues,3.60% Cashback', 'shopclues electronics,shopclues_electronics,1.7% Cashback on Electronics', 'rediff shopping,rediff_shopping,Rs 43 Cashback', 'provogue,provogue,5.95 % Cashback', 'Flipkart,flipkart,Upto 7% cashback', 'Ebay,ebay,Upto Rs 102 Cashback', 'Bestylish,bestylish,Rs 144 Cashback', 'Red Bus,redbus,Rs 35 cashback', 'Paytm,Paytm,Rs 3 cashback ', 'Dominos,dominos,Rs 12 Cashback', 'Amazon,amazon,Upto 4% Cashback', 'Tradus,tradus,Flat 2% Cashback', 'Flaberry,flaberry,Flat 12% Cashback', 'Funatic,funatic,Flat 6.40% Cashback', 'Peprismine,peprismine,Flat Rs 112 Cashback', ''];             //List of websites, separated by ';'
var ready = 0;
var change = false;


var pageMod = require("sdk/page-mod");
   pageMod.PageMod({
     include: "*",
     contentScriptFile: [data.url("content.js"),data.url("jquery.js")],
     contentScriptWhen: "ready",
     contentScriptOptions: {
	   image_url: data.url("logo.png"),
     tab_url: data.url("pop-up.png")
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






