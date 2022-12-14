let now = new Date();

let hour = now.getHours();
let min = now.getMinutes();
let currentTime = document.querySelector("#current-time");
if (min < 10) {
  min = `0${min}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let currentDay = document.querySelector("#current-day");

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
  "December"
];
let month = months[now.getMonth()];
let currentMonth = document.querySelector("#current-month");

let date = now.getDate();
let currentDate = document.querySelector("#current-date");

currentTime.innerHTML = `${hour}:${min}`;
currentDay.innerHTML = `${day},`;
currentMonth.innerHTML = `${month}`;
currentDate.innerHTML = `${date}`;


//-------------Forecast-------------//
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastOne = document.querySelector("#forecast-1");
  forecastOne.innerHTML = `<div class="future__col-temp">17°C</div>
            <div class="future__col-date">October 2</div>
            <div class="future__col-weekday">Tue</div>`;

  let forecastTwo = document.querySelector("#forecast-2");
  forecastTwo.innerHTML = `<div class="future__col-temp">18°C</div>
            <div class="future__col-date">October 3</div>
            <div class="future__col-weekday">Wed</div>`;

  let forecastThree = document.querySelector("#forecast-3");
  forecastThree.innerHTML = `<div class="future__col-temp">16°C</div>
            <div class="future__col-date">October 4</div>
            <div class="future__col-weekday">Thu</div>`;

  let forecastFour = document.querySelector("#forecast-4");
  forecastFour.innerHTML = `<div class="future__col-temp">15°C</div>
            <div class="future__col-date">October 5</div>
            <div class="future__col-weekday">Fri</div>`;

  let forecastFive = document.querySelector("#forecast-5");
  forecastFive.innerHTML = `<div class="future__col-temp">13°C</div>
            <div class="future__col-date">October 6</div>
            <div class="future__col-weekday">Sat</div>`;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5b396a5a47080bcdb4080b48bf07ot01";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
//--------Temperature-display--------//
function showTemp(response) {
  console.log(response);
  console.log(response.data.weather[0].description);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-lowest").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-highest").innerHTML = Math.round(
    response.data.main.temp_max
  );
  let weatherDescription = response.data.weather[0].description;
  const img = document.querySelector("#icon");

  //clear sky
  if (weatherDescription === "clear sky" && hour > 4 || weatherDescription === "clear sky" && hour < 18) {
    img.src = "./img/sunny.svg";
  }
  if (weatherDescription === "clear sky" && hour <= 4 || weatherDescription === "clear sky" && hour >= 18) {
    img.src = "./img/night.svg";
  }
  //scattered, few clouds
  if (weatherDescription === "scattered clouds" && hour > 4 || weatherDescription === "scattered clouds" && hour < 18 || weatherDescription === "few clouds" && hour > 4 || weatherDescription === "few clouds" && hour < 18) {
    img.src = "./img/cloudy-sunny.svg";
  }
  if (weatherDescription === "scattered clouds" && hour <= 4 || weatherDescription === "scattered clouds" && hour >= 18 || weatherDescription === "few clouds" && hour <= 4 || weatherDescription === "few clouds" && hour >= 18) {
    img.src = "./img/cloudy-night.svg";
  }
  //broken clouds, mist
  if (weatherDescription === "broken clouds" && hour > 4 || weatherDescription === "broken clouds" && hour < 18 || weatherDescription === "broken clouds" && hour <= 4 || weatherDescription === "broken clouds" && hour >= 18 || weatherDescription === "mist" && hour > 4 || weatherDescription === "mist" && hour < 18 || weatherDescription === "mist" && hour <= 4 || weatherDescription === "mist" && hour >= 18) {
    img.src = "./img/cloudy.svg";
  }
  //overcast clouds
  if (weatherDescription === "overcast clouds" && hour > 4 || weatherDescription === "overcast clouds" && hour < 18 || weatherDescription === "overcast clouds" && hour <= 4 || weatherDescription === "overcast clouds" && hour >= 18) {
    img.src = "./img/cloudy.svg";
  }
  //shower rain
  if (weatherDescription === "shower rain" && hour > 4 || weatherDescription === "shower rain" && hour < 18 || weatherDescription === "shower rain" && hour <= 4 || weatherDescription === "shower rain" && hour >= 18) {
    img.src = "./img/rainy.svg";
  }
  //rain
  if (weatherDescription === "rain" && hour > 4 || weatherDescription === "rain" && hour < 18) {
    img.src = "./img/rainy-sunny.svg";
  }
  //thunderstorm
  if (weatherDescription === "thunderstorm" && hour > 4 || weatherDescription === "thunderstorm" && hour < 18 || weatherDescription === "thunderstorm" && hour <= 4 || weatherDescription === "thunderstorm" && hour >= 18) {
    img.src = "./img/thunder.svg";
  }
  //snow
  if (weatherDescription === "snow" && hour > 4 || weatherDescription === "snow" && hour < 18) {
    img.src = "./img/snowy-sunny.svg";
  }
  if (weatherDescription === "snow" && hour <= 4 || weatherDescription === "snow" && hour >= 18) {
    img.src = "./img/snowy.svg";
  }
  getForecast(response.data.coordinates);

}

//--------Search--------//
function searchCity(city) {
  let apiKey = "01a39de43ae645c87e4580d2bd3cf422";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function citySearch(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

//--------Position___location--------//

function searchLocation(position) {
  let apiKey = "01a39de43ae645c87e4580d2bd3cf422";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySearch);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);

//-------Current Location at Load----//
searchCity(navigator.geolocation.getCurrentPosition(searchLocation));
//
//
//
//
//
//
//
//
//
//
//--------Farenheit--------//

function clickF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let currentLowest = document.querySelector("#current-lowest");
  let currentHighest = document.querySelector("#current-highest");

  let temp = currentTemp.innerHTML;
  let lowest = currentLowest.innerHTML;
  let highest = currentHighest.innerHTML;

  temp = Number(temp);
  lowest = Number(lowest);
  highest = Number(highest);

  currentTemp.innerHTML = Math.round((temp * 9) / 5 + 32);
  currentLowest.innerHTML = Math.round((lowest * 9) / 5 + 32);
  currentHighest.innerHTML = Math.round((highest * 9) / 5 + 32);
}

let tempF = document.querySelector("#temp-f");
tempF.addEventListener("click", clickF);

//--------Celsius--------//

function clickC(event) {
  event.preventDefault();

  let currentTemp = document.querySelector("#current-temp");
  let currentLowest = document.querySelector("#current-lowest");
  let currentHighest = document.querySelector("#current-highest");

  let temp = currentTemp.innerHTML;
  let lowest = currentLowest.innerHTML;
  let highest = currentHighest.innerHTML;

  temp = Number(temp);
  lowest = Number(lowest);
  highest = Number(highest);

  currentTemp.innerHTML = Math.round((temp - 32) / 1.8);
  currentLowest.innerHTML = Math.round((lowest - 32) / 1.8);
  currentHighest.innerHTML = Math.round((highest - 32) / 1.8);
}

let tempC = document.querySelector("#temp-c");
tempC.addEventListener("click", clickC);

