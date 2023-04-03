let apiKey = "add8540647afe4dac44dce1763d4a4cd";

let currentButton = document.querySelector(".current");

let currentTemp = document.querySelector("h2 .currenttemp");
let celsiusOption = document.querySelector("h2 .celsius");
let farenheitOption = document.querySelector("h2 .fahrenheit");
let quickPick = document.querySelector(".quick-pick");

let searchForm = document.querySelector(".searchForm");
searchForm.addEventListener("submit", changeInput);
function changeInput(e) {
  e.preventDefault();
  let searchInput = document.querySelector("input.form-control").value;
  getWeather(searchInput);
}

quickPick.addEventListener("click", getPickedCityWeather);

function getPickedCityWeather(e) {
  if (e.target.classList.contains("quick-pick-city")) {
    getWeather(e.target.textContent);
  }
}

getWeather("Kyiv");

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
// getCurrentLocationWeather();

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
  document.querySelector(
    ".current-temp-icon"
  ).src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  getForecast(response.data.coord);
}

function getForecast(coord) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&APPID=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  console.log(response);
}

farenheitOption.addEventListener("click", switchtoFarenheit);
function switchtoFarenheit(e) {
  if (!e.target.classList.contains("active")) {
    const currentTempInCel = currentTemp.innerHTML;
    currentTemp.innerHTML = cToF(currentTempInCel);
    farenheitOption.classList.add("active");
    celsiusOption.classList.remove("active");
  }
}

celsiusOption.addEventListener("click", switchtoCelsius);
function switchtoCelsius(e) {
  if (!e.target.classList.contains("active")) {
    const currentTempInF = currentTemp.innerHTML;
    currentTemp.innerHTML = fToC(currentTempInF);
    celsiusOption.classList.add("active");
    farenheitOption.classList.remove("active");
  }
}

function cToF(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function fToC(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}
