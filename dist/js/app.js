function initMap(){"use strict";map=new google.maps.Map(document.getElementById("map"),{center:{lat:44.635371,lng:-124.053291},zoom:14}),ko.applyBindings(new ViewModel)}function googleError(){"use strict";document.getElementById("map").innerHTML="<h2>Google Maps is not loading. Please try refreshing the page later.</h2>"}var locations=[{name:"Fast Lane Coffee",lat:44.64070053,lng:-124.05267986,id:"4d9a662a674ca14376eaba43"},{name:"Central Roast",lat:44.648684,lng:-124.052467,id:"4e54fb65814df0239959f785"},{name:"Dutch Bros. Coffee",lat:44.62933649650506,lng:-124.06172633171082,id:"4ae9a73ff964a5208ab521e3"},{name:"The Coffee House",lat:44.631362557411194,lng:-124.050916,id:"4b9bd043f964a5204e2836e3"},{name:"Bayscapes Coffee House",lat:44.63016470161697,lng:-124.05276088349126,id:"4e4455eb1838e44e898badeb"},{name:"Carls Coffee",lat:44.638854379944675,lng:-124.0611189933332,id:"5116a3fce4b04e9f6ad94274"},{name:"Dockside Coffee House Gallery",lat:44.630096,lng:-124.05267119407654,id:"4c55e6ccfd2ea59359727f2c"},{name:"Surf Town Coffee Company",lat:44.62982165943548,lng:-124.05335751403604,id:"4c02a2e89a7920a1c0b5ce79"},{name:"Starbucks",lat:44.63738090498442,lng:-124.05263566533459,id:"4bafb4d1f964a52080193ce3"},{name:"Fins Coffee at the Oregon Coastal Aquarium",lat:44.617662114530646,lng:-124.04709191325138,id:"51f42596498eabca282eba39"},{name:"Starbucks",lat:44.651158892548324,lng:-124.0517664026574,id:"4e4dd567bd41b76bef93e4a9"}],map,Place=function(e){"use strict";this.name=ko.observable(e.name),this.lat=ko.observable(e.lat),this.lng=ko.observable(e.lng),this.id=ko.observable(e.id),this.marker=ko.observable(),this.phone=ko.observable(""),this.description=ko.observable(""),this.address=ko.observable(""),this.rating=ko.observable(""),this.url=ko.observable(""),this.canonicalUrl=ko.observable(""),this.photoPrefix=ko.observable(""),this.photoSuffix=ko.observable(""),this.contentString=ko.observable("")},ViewModel=function(){"use strict";var e=this;this.placeList=ko.observableArray([]),locations.forEach(function(a){e.placeList.push(new Place(a))});var a,o=new google.maps.InfoWindow;e.placeList().forEach(function(e){a=new google.maps.Marker({position:new google.maps.LatLng(e.lat(),e.lng()),map:map,animation:google.maps.Animation.DROP}),e.marker=a,$.ajax({url:"https://api.oursquare.com/v2/venues/"+e.id()+"?client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20130815",dataType:"json",success:function(a){var n=a.response.venue;e.name(n.name);var t=n.hasOwnProperty("contact")?n.contact:"";t.hasOwnProperty("formattedPhone")&&e.phone(t.formattedPhone||"");var r=n.hasOwnProperty("location")?n.location:"";r.hasOwnProperty("address")&&e.address(r.address||"");var i=n.hasOwnProperty("bestPhoto")?n.bestPhoto:"";i.hasOwnProperty("prefix")&&e.photoPrefix(i.prefix||""),i.hasOwnProperty("suffix")&&e.photoSuffix(i.suffix||"");var s=n.hasOwnProperty("description")?n.description:"";e.description(s||"");var l=n.hasOwnProperty("rating")?n.rating:"";e.rating(l||"none");var c=n.hasOwnProperty("url")?n.url:"";e.url(c||""),e.canonicalUrl(n.canonicalUrl);var p="<h4>"+e.name()+'</h4><img src="'+e.photoPrefix()+"110x110"+e.photoSuffix()+'" alt="Image Location"><p>Information from Foursquare:</p><p>'+e.phone()+"</p><p>"+e.address()+"</p><p>"+e.description()+"</p><p>Rating: "+e.rating()+"</p><p><a href="+e.url()+">"+e.url()+'</a></p><p><a target="_blank" href='+e.canonicalUrl()+'>Foursquare Page</a></p><p><a target="_blank" href=https://www.google.com/maps/dir/Current+Location/'+e.lat()+","+e.lng()+">Directions</a></p>";google.maps.event.addListener(e.marker,"click",function(){o.open(map,this),e.marker.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){e.marker.setAnimation(null)},500),o.setContent(p)})},error:function(e){o.setContent("<h5>Foursquare data is unavailable. Please try refreshing later.</h5>"),document.getElementById("error").innerHTML="<h4>Foursquare data is unavailable. Please try refreshing later.</h4>"}}),google.maps.event.addListener(a,"click",function(){o.open(map,this),e.marker.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){e.marker.setAnimation(null)},500)})}),e.showInfo=function(e){google.maps.event.trigger(e.marker,"click")},e.visible=ko.observableArray(),e.placeList().forEach(function(a){e.visible.push(a)}),e.userInput=ko.observable(""),e.filterMarkers=function(){var a=e.userInput().toLowerCase();e.visible.removeAll(),e.placeList().forEach(function(o){o.marker.setVisible(!1),-1!==o.name().toLowerCase().indexOf(a)&&e.visible.push(o)}),e.visible().forEach(function(e){e.marker.setVisible(!0)})}};