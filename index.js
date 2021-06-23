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

function DataShow() {
  var response;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://immense-journey-36861.herokuapp.com/measurment/DML/getAllMeasurements");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        // response = JSON.parse(xhr.responseText);
        response = JSON(xhr.responseText);
        // console.log(response[0].signal_strength_level)
      }
    }
  }
  xhr.send("");




  L.geoJSON(response, {
    style: function (signal_strength_level) {
      if (response.signal_strength_level === 4)
          {
        return { radius: 10, color: "red", weight: 3, fillOpacity: 0.5 };
      }
      else if (
        response.signal_strength_level === "2") {
        return { radius: 10, color: "Orange", weight: 3, fillOpacity: 0.5 };
      }
      else {
        return { radius: 10, color: "Green", weight: 3, fillOpacity: 0.5 }; //excllent
      }
    },
    pointToLayer: function (_geoJsonPoint, latlng) {
      return L.circleMarker(latlng);
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<div><span style="font-weight: bold;"> ID : </span> ${cell_id}</div>`);
    },
  }).addTo(mymap);
}
DataShow();
