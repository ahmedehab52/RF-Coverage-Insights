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

const createGeoJSON = (response) => {
  const data = [
      {
          lat: response[0].longitude,
          lng: response[0].latitude
      }
  ];
  const dataGeoJSON = GeoJSON.parse(data, { Point: ["lat", "lng"] });
  console.log(JSON.stringify(dataGeoJSON, null, 4));
}
function DataShow() {
  var response;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://immense-journey-36861.herokuapp.com/measurment/DML/getAllMeasurements");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        response = JSON.parse(xhr.responseText);
        createGeoJSON(response);

        // console.log(response[0].signal_strength_level)
      }
    }
  }
  xhr.send("");

 
  

  L.geoJSON(response, {
    style: function (measurment) {
      if (measurment.signal_strength_level == "4")
          {
        return { radius: 10, color: "red", weight: 3, fillOpacity: 0.5 };
      }
      else if (
        measurment.signal_strength_level == "2") {
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
      layer.bindPopup(`<div><span style="font-weight: bold;"> ID : </span> ${measurement.cell_id}</div>`);
    },
  }).addTo(mymap);
  
}
DataShow();
