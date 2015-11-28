var locations = [
	{
		name: "Fast Lane Coffee",
		lat: 44.64070053,
		lng: -124.05267986
	},
	{
		name: "Dutch Bros. Coffee",
		lat: 44.62933649650506,
		lng: -124.06172633171082
	},
	{
		name: "The Coffee House",
		lat: 44.631362557411194,
		lng: -124.050916
	},
	{
		name: "Solid Grounds Coffee House",
		lat: 44.633673,
		lng: -124.057304
	},
	{
		name: "Bayscapes Coffee House",
		lat: 44.63016470161697,
		lng: -124.05276088349126
	},
	{
		name: "Carls Coffee",
		lat: 44.638854379944675,
		lng: -124.0611189933332
	},
	{
		name: "Dockside Coffee House Gallery",
		lat: 44.630096,
		lng: -124.05267119407654
	},
	{
		name: "Surf Town Coffee Company",
		lat: 44.62982165943548,
		lng: -124.05335751403604
	},
	{
		name: "Starbucks",
		lat: 44.63738090498442,
		lng: -124.05263566533459
	},
	{
		name: "Fins Coffee at the Oregon Coastal Aquarium",
		lat: 44.617662114530646,
		lng: -124.04709191325138
	},
	{
		name: "Starbucks",
		lat: 44.651158892548324,
		lng: -124.0517664026574
	}
];

// Initialize the map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.635371, lng: -124.053291},
    //center: {lat: 44.64070053, lng: -124.05267986},
    zoom: 14
  });
ko.applyBindings(new ViewModel()); 
}

function googleError() {
	"use strict";
	document.getElementById('map').innerHTML = "<h1>Google Maps is not loading</h1>";
};

//Place constructor
// Credit https://discussions.udacity.com/t/having-trouble-accessing-data-outside-an-ajax-request/39072/10
var Place = function(data) {
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.marker = ko.observable();
}

var ViewModel = function(){
	var self = this;

	// Credit https://www.udacity.com/course/viewer#!/c-ud989-nd/l-3406489055/e-3464818693/m-3464818694
	this.placeList = ko.observableArray([]);

	// Create Place objects for each item in locations
	locations.forEach(function(placeItem) {
		self.placeList.push( new Place(placeItem));
	}); 
	console.dir(self.placeList);
	
	// Credit https://github.com/kacymckibben/project-5-app.git
	var infowindow = new google.maps.InfoWindow();
	var marker;

	self.placeList().forEach(function(placeItem){

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(placeItem.lat(),placeItem.lng()),
			map: map,
			animation: google.maps.Animation.DROP,
			title: placeItem.name()
		});

		//Add infowindows credit http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
			google.maps.event.addListener(placeItem.marker, 'click', function () {
			infowindow.open(map, this);
			marker.setMap(map);
			});
		placeItem.marker = marker;
	});


	// Array with only the markers that should be visible based on search
	// Credit http://codepen.io/prather-mcs/pen/KpjbNN?editors=001
	self.visible = ko.observableArray();

	// All places are visible by default before user input
	self.placeList().forEach(function(place) {
		self.visible.push(place);
	});
	console.dir(self.visible);

	// Track user input
	self.userInput = ko.observable('');

	// Filter markers: Remove all visible places, 
	// if user input matches a place, make it and its marker visible
	self.filterMarkers = function() {
		var searchInput = self.userInput().toLowerCase();

		self.visible.removeAll();
		// Check places for match with user input
		self.placeList().forEach(function(place) {
			place.marker.setVisible(false);

		if (place.name().toLowerCase().indexOf(searchInput) !== -1) {
			self.visible.push(place);
			}
		});
		self.visible().forEach(function(place){
			place.marker.setVisible(true);
		});
	}; 



} // ViewModel






