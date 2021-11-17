//VARIABLE DECLARATIONS

//FUNCTION DECLARATIONS
function apiFetch(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function cityInput(event) {
  event.preventDefault();
  var userCity = document.getElementById("inputPassword2");

  var userInput = userCity.value;
  var requestUrl = `https://api.seatgeek.com/2/venues?city=${userInput}&client_id=MjQ0ODg0NjR8MTYzNzA5NzUyOC4xOTgwMTUy`;
  apiFetch(requestUrl);
}

//EVENT HANDLERS
document.querySelector("#submit").addEventListener("click", cityInput);
