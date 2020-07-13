const tempUnitC = document.getElementById("unit-c");
const tempUnitF = document.getElementById("unit-f");
let tempUnit = "Celsius";
const feedback = document.querySelector(".feedback");
const cityInput = document.getElementById("cityInput");

var BackgroundColor = "#4d4de8";
document.body.style.backgroundColor = BackgroundColor;

class AjaxWeather {
  constructor() {
    this.apiKey = "4ca238ef412c8bdca385ef94377ae6c8";
  }

  async getWeather(city) {
    let url;
    if (tempUnit === "Celsius") {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=imperial`;
    }
    const weatherData = await fetch(url);
    const weather = await weatherData.json();
    return weather;
  }
}
class Display {
  constructor() {
    this.results = document.querySelector(".results");
    this.cityName = document.getElementById("cityName");
    this.cityCountry = document.getElementById("cityCountry");
    this.cityIcon = document.getElementById("cityIcon");
    this.tempUnit = document.getElementById("tempUnit");
    this.cityTemp = document.getElementById("cityTemp");
    this.cityTempMin = document.getElementById("cityTempMin");
    this.cityTempMax = document.getElementById("cityTempMax");
    this.cityWeather = document.getElementById("cityWeather");
    this.cityWeatherDesc = document.getElementById("cityWeatherDesc");
    this.cityHumidity = document.getElementById("cityHumidity");
  }

  showWeather(data) {
    console.log(data);
    const {
      name,
      // weather: { main, description, icon },
      sys: { country },
      main: { temp, temp_min, temp_max, humidity }
    } = data;
    const { main } = data.weather[0];
    const { description } = data.weather[0];
    const { icon } = data.weather[0];

    this.results.classList.add("showItem");
    this.cityName.textContent = name;
    this.cityCountry.textContent = country;
    this.tempUnit.textContent = tempUnit;
    this.cityTemp.textContent = temp;
    this.cityTempMin.textContent = temp_min;
    this.cityTempMax.textContent = temp_max;
    this.cityHumidity.textContent = humidity;
    this.cityWeather.textContent = main;
    this.cityWeatherDesc.textContent = description;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
    // document.body.style.backgroundImage = 'url(\'https://media1.giphy.com/media/VxbvpfaTTo3le/giphy.gif\')';
    const code = data.weather[0].icon;
    document.body.style.backgroundColor = "";
    // document.body.b
    // const code = '01d';
    console.log(code);
    // testBg();
    switch (code) {
      case "01d":
        document.body.style.backgroundImage = "url('img/dayClear.jpg')";

        break;
      case "02d":
        document.body.style.backgroundImage = "url('img/dayFewClouds.gif')";
        break;
      case "03d":
        document.body.style.backgroundImage = "url('img/dayScattered.gif')";
        break;
      case "04d":
        document.body.style.backgroundImage = "url('img/dayBrokenClouds.jpg')";
        break;
      case "09d":
        document.body.style.backgroundImage = "url('img/dayShower.gif')";
        break;
      case "10d":
        document.body.style.backgroundImage = "url('img/dayRain.gif')";
        break;
      case "11d":
        document.body.style.backgroundImage =
          "url('img/nightThunderstorm2.gif')";
        break;
      case "13d":
        document.body.style.backgroundImage = "url('img/dayMist.jpg')";
        break;
      case "50d":
        document.body.style.backgroundImage = "url('img/dayMist.jpg')";
        break;
      case "01n":
        document.body.style.backgroundImage = "url('img/nightClear5.jpg')";
        break;
      case "02n":
        document.body.style.backgroundImage = "url('img/nightFewClouds.gif')";
        break;
      case "03n":
        document.body.style.backgroundImage = "url('img/nightScattered.gif')";
        break;
      case "04n":
        document.body.style.backgroundImage =
          "url('img/nightBrokenClouds.jpg')";
        break;
      case "09n":
        document.body.style.backgroundImage = "url('img/nightShower.gif')";
        break;
      case "10n":
        document.body.style.backgroundImage = "url('img/nightRain.gif')";
        break;
      case "11n":
        document.body.style.backgroundImage =
          "url('img/nightThunderstorm.gif')";
        break;
      case "13n":
        document.body.style.backgroundImage = "url('img/nightMist.jpg')";
      case "50n":
        document.body.style.backgroundImage = "url('img/nightMist.jpg')";
        break;
    }
  }
}

function showFeedback(text) {
  feedback.classList.add("showItem");
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(() => {
    feedback.classList.remove("showItem");
  }, 3000);
}

const ajax = new AjaxWeather();
const display = new Display();

function getTemperatures(event) {
  event.preventDefault();
  const city = cityInput.value;
  // testBg();
  if (city.length === 0) {
    showFeedback("city value cannot be empty");
  } else {
    ajax.getWeather(city).then(data => {
      if (data.message === "city not found") {
        showFeedback("city with such name cannot be found");
      } else {
        display.showWeather(data);
        // const wcd=prompt('code?');
        // testBg(wcd);
      }
    });
  }
}

(function init() {
  const form = document.getElementById("wheatherForm");
  form.addEventListener("submit", getTemperatures);
})();

tempUnitC.addEventListener("click", event => {
  tempUnitC.classList = "unit-selected";
  tempUnitF.classList = "unit-not-selected";
  tempUnit = "Celsius";
  getTemperatures(event);
});

tempUnitF.addEventListener("click", event => {
  tempUnitF.classList = "unit-selected";
  tempUnitC.classList = "unit-not-selected";
  tempUnit = "Fahrenheit";
  getTemperatures(event);
});

function testBg(code) {
  // wcodes=['01d','01n','02d','02n','03d','03n','04d','04n','09d','09n','10d','10n','11d','11n','13d','13n','50d','50n'];
  // wcodes.forEach ( function (code){
  switch (code) {
    case "01d":
      document.body.style.backgroundImage = "url('img/dayClear.jpg')";

      break;
    case "02d":
      document.body.style.backgroundImage = "url('img/dayFewClouds.gif')";
      break;
    case "03d":
      document.body.style.backgroundImage = "url('img/dayScattered.gif')";
      break;
    case "04d":
      document.body.style.backgroundImage = "url('img/dayBrokenClouds.jpg')";
      break;
    case "09d":
      document.body.style.backgroundImage = "url('img/dayShower.gif')";
      break;
    case "10d":
      document.body.style.backgroundImage = "url('img/dayRain.gif')";
      break;
    case "11d":
      document.body.style.backgroundImage = "url('img/nightThunderstorm2.gif')";
      break;
    case "13d":
      document.body.style.backgroundImage = "url('img/dayMist.jpg')";
      break;
    case "50d":
      document.body.style.backgroundImage = "url('img/dayMist.jpg')";
      break;
    case "01n":
      document.body.style.backgroundImage = "url('img/nightClear4.jpg')";
      break;
    case "02n":
      document.body.style.backgroundImage = "url('img/nightFewClouds.gif')";
      break;
    case "03n":
      document.body.style.backgroundImage = "url('img/nightScattered.gif')";
      break;
    case "04n":
      document.body.style.backgroundImage = "url('img/nightBrokenClouds.jpg')";
      break;
    case "09n":
      document.body.style.backgroundImage = "url('img/nightShower.gif')";
      break;
    case "10n":
      document.body.style.backgroundImage = "url('img/nightRain.gif')";
      break;
    case "11n":
      document.body.style.backgroundImage = "url('img/nightThunderstorm.gif')";
      break;
    case "13n":
      document.body.style.backgroundImage = "url('img/nightMist.jpg')";
    case "50n":
      document.body.style.backgroundImage = "url('img/nightMist.jpg')";
      break;
  }
  // });
  // testBg();
}

// weatherIcon.src = `https://openweathermap.org/img/wn/${code}@2x.png`;
// cityName.innerHTML = data.name + ', ' + data.sys.country;
