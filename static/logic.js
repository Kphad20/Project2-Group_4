// Creating layers for map
// Adding tile layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 4,
  minZoom: 4,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});

//Initialize all of the LayerGroups
var layers = {
  CONSUMPTION : new L.LayerGroup(),
  PRODUCTION : new L.LayerGroup(),
  EMISSIONS : new L.LayerGroup()
};

// Define a map object
var myMap = L.map("map", {
  center: [40, -95],
  zoom: 2,
  layers: [
    layers.CONSUMPTION,
    layers.PRODUCTION,
    layers.EMISSIONS]
});

lightmap.addTo(myMap);

// Create an overlays object to add to layer control
var overlays = {
  "Production": layers.PRODUCTION,
  "Consumption": layers.CONSUMPTION,
  "Emissions": layers.EMISSIONS
};

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(null, overlays, {
  collapsed: false
});

var info = L.control({
  position: "bottomright"
});

// // When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// // Add the info legend to the map
info.addTo(myMap);

var path = "data/states.geojson";

var geojson;

d3.json(path, function(err, data) {
  if(err) console.log("error fetching data");
  d3.json("http://localhost:5000/api", function(energyData) {

      PRODUCTION = [];
      CONSUMPTION = [];
      EMISSIONS = [];
  
      for (var i = 0; i < energyData.length; i++) {
        var production = energyData[i]["Production Share"];
        var consumption = energyData[i]["Consumption per capita"];
        var emissions = energyData[i]["Carbon Dioxide Emission"];

        PRODUCTION.push(
          production
        );

        CONSUMPTION.push(
          consumption
        );

        EMISSIONS.push(
          emissions
        );

        console.log(PRODUCTION);
        console.log(CONSUMPTION);
        console.log(EMISSIONS)};

      geojson = L.choropleth(data, {
        
        // Define what property in the features to use
        valueProperty: "CENSUSAREA",

        // Set color scale
        scale: ["#ffffb2", "#b10026"],
        steps: 5,
        mode: "q",
        style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.8
        },

        onEachFeature: function(feature, layer) {

          // Set mouse events to change map styling on mouseover and mouseout
          layer.on({
            mouseover: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 1
              });
            },
            mouseout: function(event) {
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.8
              });
            }
          });

          // Binding a pop-up to each layer
          layer.bindTooltip(feature.properties.NAME);
          },
      }).addTo(myMap);
  });
});