// var response;
// var BaseMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// var mymap = L.map("mapid", {
//   center: [30.1, 31.3],
//   zoom: 13,
//   layers: [BaseMap],
//   maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
//   zoomDelta: 0.6,
//   worldCopyJump: true,
//   doubleClickZoom: false,
// });



// var geoData = [];
// var obj ={}
// var properties = {cell_id:"",signal_Level:""}
// function DataShow() {
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "https://immense-journey-36861.herokuapp.com/measurment/DML/getAllMeasurements");
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4) {
//       if (xhr.status == 200) {
//         response = JSON.parse(xhr.responseText);
//            for(let i=0;i<Object.size(response['measurement']);i++){
//              obj["properties"] = {IMSI:response['measurement'][i]['imsi'],
//                IMEI:response['measurement'][i]['imei'],
//                operator:response['measurement'][i]['operator'],
//                country:response['measurement'][i]['country'],
//                cell_id: response['measurement'][i]['cell_id'],
//                status:response['measurement'][i]['signal_strength_level']}
//              obj["type"] = "Feature";
//              obj["geometry"] = {"type": "Point","coordinates": [response['measurement'][i]['latitude'], response['measurement'][i]['longitude']]}
//              geoData.push(obj)
//            }

//            L.geoJSON(geoData, {
//             style: function (features) {
//               if (
//                 features.properties.status === "-50"
//               ) {
//                 return { radius: 10, color: "red", weight: 3, fillOpacity: 0.5 };}
//                else if (
//                 features.properties.status === "-120"
//               ) {
//                 return { radius: 10, color: "Green", weight: 3, fillOpacity: 0.5 };}
//               else {
//                 return { radius: 10, color: "Orange", weight: 3, fillOpacity: 0.5 }; //excllent
//               }
//             },
//             pointToLayer: function (geoJsonPoint, latlng) {
//               return L.circleMarker(latlng);
//             },
//             onEachFeature: function (feature, layer) {
//               layer.bindPopup(`<div><span style="font-weight: bold;"> Cell ID : </span> ${feature.properties.cell_id}<br><span style="font-weight: bold;"> IMSI : </span>${feature.properties.IMSI}
//               <br><span style="font-weight: bold;"> IMEI : </span>${feature.properties.IMEI}
//               <br><span style="font-weight: bold;"> Operator : </span>${feature.properties.operator}
//               <br><span style="font-weight: bold;"> Country : </span>${feature.properties.country}
//               <br><span style="font-weight: bold;"> latitude : </span>${feature.geometry.coordinates[0]}</div>`);
//             },
//           }).addTo(mymap);
            
        
            

//        }
//      }
//    }
//   xhr.send("");


// Object.size = function (obj) {
//   var size = 0,
//     key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) size++;
//   }
//   return size;
// };
// }
// DataShow()
// var markers = [
//   ['1', 51.5286416, -1.5015987],
//   ['2', 51.4505299, -0.0854554],
//   ['3', 52.5159729, -0.174943]
// ];  

// function initialize() {
    
//   var center = {lat: 51.5159729, lng: -0.1015987},
//       map = new google.maps.Map(document.getElementById('map'), {
//         disableDefaultUI: true,
//         center: center,
//         zoom: 11
//   });

//   var Markers = [];
  
//   var iconNormal = 'https://i.stack.imgur.com/AAsD3.png',
//       iconSelected = 'https://webdesign.danols.com/static/template/images/icons/light/pin_map_icon&48.png',
//       bounds = new google.maps.LatLngBounds();
//   function setMarkers(map) {
//     for (var i = 0; i < markers.length; i++) {
//       var marker = markers[i],
//           myLatLng = new google.maps.LatLng(marker[1], marker[2]),
//           eachMarker = new google.maps.Marker({
//             record_id: i,
//             position: myLatLng,
//             map: map,
//             animation: google.maps.Animation.DROP,
//             icon: iconNormal,
//             title: marker[0]
//       });
//       //var selectedMarker;
//       bounds.extend(myLatLng);
//       Markers.push(eachMarker);

     /* google.maps.event.addListener(eachMarker,'click', function() {
        changeIcon(this);
      });

      function changeIcon(e){
        if (selectedMarker) {
          selectedMarker.setIcon(iconNormal);
        }
        e.setIcon(iconSelected);
        selectedMarker = e;
      }*/
      
      // choose from list
      var locations = [
        ['<b>England Branch,</b><br> International city', -33.80010128657071, 151.28747820854187, 2, "https://maps.google.com/mapfiles/ms/micons/blue.png"],
        ['<b>Greec Branch,</b><br> International city', -33.950198, 151.259302, 1, "https://maps.google.com/mapfiles/ms/micons/green.png"]
      ];
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      var infowindow = new google.maps.InfoWindow();
      var marker, i;
      for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          icon: locations[i][4],
          map: map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          }
        })(marker, i));
      }