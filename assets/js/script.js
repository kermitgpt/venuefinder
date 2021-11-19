//VARIABLE DECLARATIONS
var venueNames;
var venueUrl;
var venueAddress;
var cityAndZip;
var coordinatesLat;
var coordinatesLon;
var cardDiv = document.getElementById("hide-container");
//FUNCTION DECLARATIONS

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0dGdyb2dhbmRldiIsImEiOiJja3cyYjlqZDAwMG4zMm5tbmhoNXhmODRmIn0.A3BMTifw9bGTZY-Ks3uS0w";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-96, 37.8],
  zoom: 3,
});

// add markers to map
/* const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-77.032, 38.913],
      },
      properties: {
        title: "Mapbox",
        description: "Washington, D.C.",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.414, 37.776],
      },
      properties: {
        title: "Mapbox",
        description: "San Francisco, California",
      },
    },
  ],
};


for (const feature of geojson.features) {
  // create a HTML element for each feature
  const el = document.createElement("div");
  el.className = "marker";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
} */

//General function for API retrieval
// function apiFetch(requestUrl) {
//   var apiData;
//     .then(function (data) {
//       apiData = data;
//     });
//   return apiData;
// }

//Retrieves an array of objects for 10 venues
function cityInput(event) {
  event.preventDefault();
  var userCity = document.getElementById("inputPassword2");

  var userInput = userCity.value;
  var requestUrl = `https://api.seatgeek.com/2/venues?city=${userInput}&per_page=9&client_id=MjQ0ODg0NjR8MTYzNzA5NzUyOC4xOTgwMTUy`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      updateVenue(data);
    });
}

function updateVenue(d) {
  for (var i = 0; i < d.venues.length; i++) {
    /* console.log(d.venues[i].name); */
    venueNames = d.venues[i].name;
    venueUrl = d.venues[i].url;
    venueAddress = d.venues[i].address;
    cityAndZip = d.venues[i].extended_address;
    coordinatesLat = d.venues[i].location.lat;
    coordinatesLon = d.venues[i].location.lon;

    new mapboxgl.Marker()
      .setLngLat([coordinatesLon, coordinatesLat])
      .addTo(map);

    map.jumpTo({ center: [coordinatesLon, coordinatesLat], zoom: 10 });

    /*     map.on("load", () => {
      for (const [index, coordinate] of parsedCoordinates.entries()) {
        setTimeout(() => {
          map.jumpTo({ center: coordinate });
        }, 2000 * index);
      }
    }); */

    /* document.getElementById("card1").innerHTML = d.venues[0].name; */
    var mainDiv = "";
    var displayCards = document.getElementById("contentCards");
    // document.getElementById("name1").innerHTML = d.venues[0].name;
    var colDiv = document.createElement("div");
    colDiv.setAttribute("class", "col-4 justify-content-center");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "card");
    var newImg = document.createElement("img");
    newImg.setAttribute("class", "card-img-top");
    newImg.setAttribute("src", "place-holder.png");
    newImg.setAttribute("alt", "Card image cap");
    newDiv.appendChild(newImg);
    colDiv.appendChild(newDiv);
    cardDiv.appendChild(colDiv);
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    var h5 = document.createElement("h5");
    h5.setAttribute("class", "card-title");
    h5.textContent = venueNames;
    cardBody.appendChild(h5);
    newDiv.appendChild(cardBody);
    var displayAddress = document.createElement("p");
    displayAddress.setAttribute("class", "card-text");
    displayAddress.textContent = venueAddress;
    cardBody.appendChild(displayAddress);
    newDiv.appendChild(cardBody);
    var displayZip = document.createElement("p");
    displayZip.setAttribute("class", "card-text");
    displayZip.textContent = cityAndZip;
    cardBody.appendChild(displayZip);
    newDiv.appendChild(cardBody);
    var goButton = document.createElement("a");
    goButton.setAttribute("class", "btn btn-primary");
    goButton.setAttribute("href", venueUrl);
    goButton.textContent = "Get Tickets";
    cardBody.appendChild(goButton);
    newDiv.appendChild(cardBody);
  }
}

function hideCards() {
  cardDiv.style.display = "block";
}

/* function pullData(venueData) {
  console.log(venueData.data.venues[i].name);
} */

/* 
function cityInput(event) {
  event.preventDefault();
  var userCity = document.getElementById("inputPassword2");

  var userInput = userCity.value;
  var requestUrl = `https://api.seatgeek.com/2/venues?city=${userInput}&client_id=MjQ0ODg0NjR8MTYzNzA5NzUyOC4xOTgwMTUy`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   apiData = data.venues;
      console.log(data.venues);
      for (var i = 0; i < data.venues.length; i++) {
        console.log(data.venues.location.lat[i]);
        console.log(data.venues.location.lon[i]);
      }
    });
  //   console.log(apiFetch(requestUrl));
} */

//create api fetch functions for url, long/lat, address

// var venueArray;
// var venueName;
// var venueAddress;
// var venueUrl;

//EVENT HANDLERS
//Listens for a click on the submit button
document.querySelector("#submit").addEventListener("click", cityInput);
