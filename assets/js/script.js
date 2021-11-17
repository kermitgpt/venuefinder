//VARIABLE DECLARATIONS

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
      //   apiData = data.venues;
      console.log(data.venues);
      for (var i = 0; i < data.venues.length; i++) {
        console.log(data.venues[i]);
      }
    });
  //   console.log(apiFetch(requestUrl));
}

// var venueArray;
// var venueName;
// var venueAddress;
// var venueUrl;

//EVENT HANDLERS
//Listens for a click on the submit button
document.querySelector("#submit").addEventListener("click", cityInput);
