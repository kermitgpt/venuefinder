//VARIABLE DECLARATIONS
var venueNames;
var venueUrl;
var venueAddress;
var cityAndZip;
var coordinatesLat;
var coordinatesLon;
var cardDiv = document.getElementById("hide-container");
//FUNCTION DECLARATIONS
var venueArray = [];
// console.log(images);
mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0dGdyb2dhbmRldiIsImEiOiJja3cyYjlqZDAwMG4zMm5tbmhoNXhmODRmIn0.A3BMTifw9bGTZY-Ks3uS0w";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-96, 37.8],
  zoom: 3,
});

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
  var images = [
    "./assets/images/image1.jpg",
    "./assets/images/image2.jpg",
    "./assets/images/image3.jpg",
    "./assets/images/image4.jpg",
    "./assets/images/image5.jpg",
    "./assets/images/image6.jpg",
    "./assets/images/image7.jpg",
    "./assets/images/image8.jpg",
    "./assets/images/image9.jpg",
  ];
  function randomImage(images) {
    // get random index value
    var randomIndex = Math.floor(Math.random() * images.length);

    // get random item
    var item = images[randomIndex];
    images.splice(randomIndex, 1);
    return item;
  }
  cardDiv.innerHTML = "";
  for (var i = 0; i < d.venues.length; i++) {
    venueNames = d.venues[i].name;
    venueUrl = d.venues[i].url;
    venueAddress = d.venues[i].address;
    cityAndZip = d.venues[i].extended_address;
    coordinatesLat = d.venues[i].location.lat;
    coordinatesLon = d.venues[i].location.lon;

    venueArray.push(venueNames);
    localStorage.setItem("venue-results", JSON.stringify(venueArray));

    new mapboxgl.Marker()
      .setLngLat([coordinatesLon, coordinatesLat])
      .addTo(map);

    map.jumpTo({ center: [coordinatesLon, coordinatesLat], zoom: 10 });

    var mainDiv = "";
    var displayCards = document.getElementById("contentCards");
    var colDiv = document.createElement("div");
    colDiv.setAttribute("class", "col-4 justify-content-center");
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "card");
    var newImg = document.createElement("img");
    newImg.setAttribute("class", "card-img-top");
    newImg.setAttribute("src", randomImage(images));
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

document.querySelector("#submit").addEventListener("click", cityInput);
