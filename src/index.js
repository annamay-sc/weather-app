let now = new Date();
let date = now.getDate();
let seconds = now.getMilliseconds();
let year = now.getFullYear();
let hour = now.getHours();
let minute = now.getMinutes();
console.log(now.getSeconds());
console.log(now.getDay());
console.log(now.getDate());
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getHours());
console.log(now.getMinutes());

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

document.getElementById(
  "time"
).innerHTML = `${hour}:${minute} </br> ${day} ${month} ${date}, ${year}`;
function formatDate() {
  return `${hour}:${minute} ${day} ${month} ${date}, ${year}`;
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
          <div class = weather-forecast-date> ${day} </div>
              <i class="fas fa-sun weather"></i>
              <br />
              <div class="weather-forecast-temperatures"> 
                <span class="weather-forecast-temperature-max"> 85°</span> 
                <span class="weather-forecast-temperature-min"> 65°</span> 
              </div>
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "e44125e94d8c8ca1fb8ce7697ffa8a7b";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#search-city");
  let cityElement = document.querySelector("#display-city");
  cityElement.innerHTML = `${enterCity.value}`;
  searchCity(enterCity.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data);
}

function searchCity(city) {
  let apiKey = "e44125e94d8c8ca1fb8ce7697ffa8a7b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getCurrentCity);
}

function locate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e44125e94d8c8ca1fb8ce7697ffa8a7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCurrentCity);
}

function getCurrentCity(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#display-city");
  cityElement.innerHTML = response.data.name;

  celciusTemperature = response.data.main.temp;

  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);

  let iconElement = document.querySelector("#current-icon");

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", locate);

function convertToFahrenheit(event) {
  event.preventDefault;
  temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusTemperature = null;

function convertToCelsius(event) {
  event.preventDefault;
  temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("New York");

displayForecast();
