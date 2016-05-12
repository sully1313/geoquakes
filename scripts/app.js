var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {

  $quakesList = $('#info');

  // compile handlebars template
  var source = $('#quakes-template').html();
  template = Handlebars.compile(source);

  createMap();
  fetchQuakeData();

});

function createMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.78, lng: -122.44},
    zoom: 2
  });
}

function fetchQuakeData() {
  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint,
    success: onSuccess,
    error: onError
  });
}

function onSuccess(json) {
  var earthquakes = json.features;

  // pass in data to render in the template
  var quakesHtml = template({ quakes: earthquakes });

  // append html to the view
  $quakesList.append(quakesHtml);

  // iterate through earthquakes to create map markers
  earthquakes.forEach(function (quake) {
    var lat = quake.geometry.coordinates[1];
    var lng = quake.geometry.coordinates[0];
    new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      title: quake.properties.title
    });
  });
}

function onError(xhr, status, errorThrown) {
  alert("Sorry, there was a problem!");
  console.log("Error: " + errorThrown);
  console.log("Status: " + status);
  console.dir(xhr);
}
