let apiKey = "add8540647afe4dac44dce1763d4a4cd";
let forecastApiKey = "6bfa54f242cbb59343d4e58db578dc61";

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&APPID=${forecastApiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  const forecast = response.data.daily;

  let forecastElement = document.getElementById("forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  
    <div class="col-2 forecast-day">
      <div>
        ${formatDay(day.dt)}
      </div>
      <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="" width="70px">
      <div class="forecast-temperature">
        <strong class="forecast-max">
          <span class="forecast-temp">${Math.round(day.temp.max)}</span>°
        </strong>
        <span class="forecast-min">
          <span class="forecast-temp">${Math.round(day.temp.min)}</span>°
        </span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

farenheitOption.addEventListener("click", switchtoFarenheit);
function switchtoFarenheit(e) {
  if (!e.target.classList.contains("active")) {
    const currentTempInCel = currentTemp.innerHTML;
    currentTemp.innerHTML = cToF(currentTempInCel);
    farenheitOption.classList.add("active");
    celsiusOption.classList.remove("active");

    const forecastTemps = document.querySelectorAll(".forecast-temp");
    forecastTemps.forEach(function (element) {
      const forecastTempInCel = element.innerHTML;
      element.innerHTML = cToF(forecastTempInCel);
    });
  }
}

celsiusOption.addEventListener("click", switchtoCelsius);
function switchtoCelsius(e) {
  if (!e.target.classList.contains("active")) {
    const currentTempInF = currentTemp.innerHTML;
    currentTemp.innerHTML = fToC(currentTempInF);
    celsiusOption.classList.add("active");
    farenheitOption.classList.remove("active");

    const forecastTemps = document.querySelectorAll(".forecast-temp");
    forecastTemps.forEach(function (element) {
      const forecastTempInF = element.innerHTML;
      element.innerHTML = fToC(forecastTempInF);
    });
  }
}

function cToF(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function fToC(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

function formatDay(timestamp) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(timestamp * 1000);

  return days[date.getDay()];
}
