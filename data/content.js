var split = self.options.split;

var panel,tab;           //The popup on mouseover
var content_css = "font:17px arial,sans-serif; padding-top: 5%;padding-bottom: 5%; text-align:center;"
					+"vertical-align: center;background-color: #ffffff; cursor: pointer;color: #000099;";

var content_css2 = "font:13px arial,sans-serif; padding-top: 1%;text-align:center;"
					+"vertical-align: center;background-color: #ffffff; cursor: pointer;color: #000099;";

<<<<<<< Updated upstream
var panel;           //The popup on mouseover
var content_css = "font:90% arial,sans-serif; padding-top: 5%;padding-bottom: 2%; text-align:center;vertical-align: center;background-color: #ffffff; cursor: pointer;color: #000099;"
var content_css2 = "font:70% arial,sans-serif; padding-top: 1%;text-align: center;vertical-align: center;background-color: #ffffff; cursor: pointer;color: #000000;";
var header_css = "border-bottom: 5px solid #e1ddd8; height:15%; background-color: #223355;";
var main_css = "position:fixed; top:7%; background-color: #ffffff; border:2px solid #555555;  z-index: 9999999; width:15%; height:auto; right:-15%";
=======
var header_css = "border-bottom: 5px solid #e1ddd8; height:65px; background-color: #223355;";
>>>>>>> Stashed changes

var main_css = "position:fixed; top:7%; background-color: #ffffff; border:"
				+ "2px solid #555555;  z-index: 9999999; width:250px; height:25%; right:-250px";

var tab_css = 'position:fixed; cursor:pointer;'
				+'height:25%; width:278px; padding-bottom:2px;'
				+' margin-to5px; top:7%; right:-250px; z-index: 999999999;';
var anim_flag=0;

if (true) {
	  var url = "" + window.location.href;    //url of current tab
	  var title = document.title;
	  if (url!="" && url.indexOf("ads")==-1) {
		  //console.log("url: " + url + "\ntitle: " + title);
		  var message = "Sorry. No coupons Found";      //message displayed in popup
		  var flag = 0;                     // flag=1 when website matches list of options
		  
		  for (var i=0; i<split.length-1; i++) {

		  	var merchant_data = split[i].split(",");
		  	var compare;                //to check with the url
		  	
		    if(merchant_data[0].indexOf("|")!=-1) {      //for ambiguous cases like yatra
		  		compare = merchant_data[0].split("|")[0];
		  	}
		  	else {
		  		compare = merchant_data[0];
		  	}
		    compare += ".";   //match only url, not any page of another website
		    if(url.indexOf(compare.toLowerCase())!=-1 && url.indexOf("shoppingbaba.in")==-1) {
		      //For ambiguous cases on a single site ex. yatra
		      if (merchant_data[0].indexOf("|")!=-1) {
		      	if(title.toLowerCase().indexOf(merchant_data[0].split("|")[1].toLowerCase())==-1) {
		      		continue;
		      	}
		      }
		      flag = 1;
		      message = merchant_data[1] + "," + merchant_data[2];  //shopping baba store + "," + discount
		      panel = '<div id="shoppingbaba_main" style="' + main_css +
						'"><header style="'+ header_css + '">'
						+'<img src = "' + self.options.image_url + '" style="position:relative; height:auto; width:100%; margin-top:3%; margin-bottom:3%" />'
						+'</header><div id="content" style="' + content_css
						+ '">' + merchant_data[2] + '</div>'
						+ '<div class="containertext2" style="' + content_css2 + '">Click to Redeem This Offer</div></div>';
			  //console.log("Panel: " + panel);
		      console.log("match found at Index:" + i);
		    }
		  }
		  if (flag == 1) {
		    	console.log("Match found: " + url);	
				console.log("Ready: " + self.options.tab_url);
				document.addEventListener('DOMContentLoaded', function() {
<<<<<<< Updated upstream
					var elemDiv = document.createElement('div');
					elemDiv.id = "shoppingbaba_tab"
					elemDiv.style.cssText = 'position:fixed; cursor:pointer;'
											+' background:url("' + self.options.tab_url + '")'
											+' no-repeat;background-size:auto 100%; height:10px; width:16.5%; padding-bottom:2px;'
											+' margin-top:2px; top:7%; right:-15%; z-index: 99999999;';

						
					$(document).ready(function(){
						$("#shoppingbaba_tab").css("height", $("#shoppingbaba_main").height());});

					$(window).resize(function(){
						$("#shoppingbaba_tab").css("height", $("#shoppingbaba_main").height());});


					//var elemheight = $("#shoppingbaba_tab").css("height");
					//console.log("Height: " + $elemheight);
					// $("#shoppingbaba_tab").css("height", elemheight)
					//console.log("Tab: " + elemDiv.style.cssText.margin-top + "," + self.options.tab_url);
					document.body.appendChild(elemDiv);	
=======
					
					tab = '<div id="shoppingbaba_tab" style="' + tab_css + '"> <img src="' + self.options.tab_url
							+ '" style="height:99.9%; left:-1px"/> </div>';
											
					$("body").append(tab);	
>>>>>>> Stashed changes
					$("body").append(panel);
					//Mouse over, popup Animation
								$("#shoppingbaba_tab").on("mouseover", function(){
									//console.log("Mouseover");
<<<<<<< Updated upstream
									$( '#shoppingbaba_main' ).animate({right: "0px"}, 500);
									$('#shoppingbaba_tab').animate({right:"+=15%"}, 500);
=======
									if (!anim_flag) {
										anim_flag = 1;
										$( '#shoppingbaba_main' ).animate({right: "0px"}, 500, function() {
											anim_flag = 0;
										});
										$('#shoppingbaba_tab').animate({right:"2px"}, 500);
									}
									
>>>>>>> Stashed changes
								});

								//Mouse out, popup Animation
								$("#shoppingbaba_tab").on("mouseout", function(){
									//console.log("MouseOut");
<<<<<<< Updated upstream
									$( '#shoppingbaba_main' ).animate({right: "-15%"}, 500);
									$('#shoppingbaba_tab').animate({right:"-15%"}, 500);
=======
									if (!anim_flag) {
										anim_flag = 1;
										$( '#shoppingbaba_main' ).animate({right: "-250px"}, 500, function() {
											anim_flag = 0;
										});
										$('#shoppingbaba_tab').animate({right:"-250px"}, 500);	
									}
									
>>>>>>> Stashed changes
								});
								//Click to go to store
								$("#shoppingbaba_tab").on("click", function() {
									window.open("http://www.shoppingbaba.in/stores/" + merchant_data[1], "_blank");
								});
					self.port.emit("changed");
					$("#shoppingbaba_tab").css("height", $("#shoppingbaba_main").height());
				}, false);
					
				//document.body.innerHTML += "<div id='shopping-baba' style='position:fixed;  background: url(\"http://1.bp.blogspot.com/--tscpVzcBjo/TdUarKtcAlI/AAAAAAAAA3I/qVkypiYO9rc/s150/w2b_facebookbadge.png\") no-repeat; height:270px; width:245px; padding-bottom:2px; padding-top:2px; top:15%; right:-200px; z-index: 999999;'></div>" ;
				//window.alert("BINGO");
		}
	}
}

