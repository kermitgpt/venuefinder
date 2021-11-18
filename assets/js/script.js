//VARIABLE DECLARATIONS
var venueNames;
var venueUrl;
var venueAddress;
var cityAndZip;
var coordinatesLat;
var coordinatesLon;

//FUNCTION DECLARATIONS

//General function for API retrieval
function apiFetch(requestUrl) {
  var apiData;
  //     .then(function (data) {
  //       apiData = data;
  //     });
  //   return apiData;
}

//Retrieves an array of objects for 10 venues
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
    /* document.getElementById("card1").innerHTML = d.venues[0].name; */
    var mainDiv = "";
    var displayCards = document.getElementById("contentCards");
  }
}

function hideCards() {
  var cardDiv = document.getElementById("hide-container");
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
