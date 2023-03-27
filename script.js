let apiKey = "add8540647afe4dac44dce1763d4a4cd";

let currentTime = document.querySelector("span.settime");

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hours}:${minutes}`;

let currentButton = document.querySelector(".current");

let currentTemp = document.querySelector("h2 .currenttemp");
let celsiusOption = document.querySelector("h2 .celsius");
let farenheitOption = document.querySelector("h2 .fahrenheit");

let searchForm = document.querySelector(".searchForm");
searchForm.addEventListener("submit", changeInput);
function changeInput(e) {
  e.preventDefault();
  let searchInput = document.querySelector("input.form-control").value;
  getWeather(searchInput);
}

function getWeather(cityName) {
  document.querySelector("h1").innerHTML = `Currently in ${cityName}`;
  document.querySelector("h2.chosencity").innerHTML = `${cityName}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

currentButton.addEventListener("click", getCurrentLocationWeather);
function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
getCurrentLocationWeather();

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  document.querySelector("h1").innerHTML = `Currently in ${response.data.name}`;
  document.querySelector("h2.chosencity").innerHTML = response.data.name;
  document.querySelector(".current-temp-description").innerHTML = response.data.weather[0].description;
  document.querySelector(".current-temp-humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".current-temp-wind").innerHTML = response.data.wind.speed;
  currentTemp.innerHTML = Math.round(response.data.main.temp);
}

// farenheitOption.addEventListener("click", switchtoFarenheit);
// function switchtoFarenheit() {
//   currentTemp.innerHTML = "-20";
//   farenheitOption.classList.add("active");
//   celsiusOption.classList.remove("active");
// }

// celsiusOption.addEventListener("click", switchtoCelsius);
// function switchtoCelsius() {
//   currentTemp.innerHTML = "-3";
//   celsiusOption.classList.add("active");
//   farenheitOption.classList.remove("active");
// }
