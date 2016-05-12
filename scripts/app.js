var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var map;
var template;

$(document).on("ready", function() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.78, lng: -122.44},
    zoom: 2
  });

  var source = $('#quakes-template').html();
  template = Handlebars.compile(source);
  $.ajax({
    method: 'GET',
    url: weekly_quakes_endpoint,
  }).done(function(data){
     step2(data);
  })
});

function step2(json){
  var eq = json.features;
  var eqHTML = template({ quakes: eq });
  $('#info').append(eqHTML);
  eq.forEach(function(quake){
    var lat = quake.geometry.coordinates[1];
    var lng = quake.geometry.coordinates[0];
    new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      title: quake.properties.title
    })
  })
}
