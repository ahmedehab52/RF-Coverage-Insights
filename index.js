 var BaseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var mymap = L.map("mapid", {
  center: [30.1, 31.3],
  zoom: 11,
  layers: [BaseMap],
  maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
  zoomDelta: 0.6,
  worldCopyJump: true,
  doubleClickZoom: false,
});

async function DataShow() {
  let response = await fetch("https://immense-journey-36861.herokuapp.com/measurment/DML/getAllMeasurements")
  
  let data = await response.json();
  console.log(data)

  

   L.geoJSON(data, {
     style: function (features) {
       if (
         features.properties.signal_strength_level === "4"
       ) {
         return { radius: 10, color: "red", weight: 3, fillOpacity: 0.5 };}
        else if (
         features.properties.status === "2"
       ) {
         return { radius: 10, color: "Orange", weight: 3, fillOpacity: 0.5 };}
       else {
         return { radius: 10, color: "Green", weight: 3, fillOpacity: 0.5 }; //excllent
       }
     },
     pointToLayer: function (geoJsonPoint, latlng) {
       return L.circleMarker(latlng);
     },
     onEachFeature: function (feature, layer) {
       layer.bindPopup(`<div><span style="font-weight: bold;"> ID : </span> ${feature.properties.ID}</div>`);
     },
   }).addTo(mymap); 
}
DataShow();
