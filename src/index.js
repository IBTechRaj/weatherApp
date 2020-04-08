const tempUnitC = document.getElementById('unit-c');
const tempUnitF = document.getElementById('unit-f');
let tempUnit = 'Celsius';
const feedback = document.querySelector('.feedback');
const cityInput = document.getElementById('cityInput');

class AjaxWeather {
  constructor() {
    this.apiKey = '4ca238ef412c8bdca385ef94377ae6c8';
  }

  async getWeather(city) {
    let url;
    if (tempUnit === 'Celsius') {
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
    this.results = document.querySelector('.results');
    this.cityName = document.getElementById('cityName');
    this.cityCountry = document.getElementById('cityCountry');
    this.cityIcon = document.getElementById('cityIcon');
    this.tempUnit = document.getElementById('tempUnit');
    this.cityTemp = document.getElementById('cityTemp');
    this.cityHumidity = document.getElementById('cityHumidity');
  }

  showWeather(data) {
    console.log(data);
    const {
      name,
      sys: { country },
      main: { temp, humidity },
    } = data;
    const { icon } = data.weather[0];

    this.results.classList.add('showItem');
    this.cityName.textContent = name;
    this.cityCountry.textContent = country;
    this.tempUnit.textContent = tempUnit;
    this.cityTemp.textContent = temp;
    this.cityHumidity.textContent = humidity;
    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;
  }
}


function showFeedback(text) {
  feedback.classList.add('showItem');
  feedback.innerHTML = `<p>${text}</p>`;

  setTimeout(() => {
    feedback.classList.remove('showItem');
  }, 3000);
}


const ajax = new AjaxWeather();
const display = new Display();

function getTemperatures(event) {
  event.preventDefault();
  const city = cityInput.value;

  if (city.length === 0) {
    showFeedback('city value cannot be empty');
  } else {
    ajax.getWeather(city).then(data => {
      if (data.message === 'city not found') {
        showFeedback('city with such name cannot be found');
      } else {
        display.showWeather(data);
      }
    });
  }
}

(function init() {
  const form = document.getElementById('wheatherForm');


  form.addEventListener('submit', getTemperatures);
}());


tempUnitC.addEventListener('click', (event) => {
  tempUnitC.classList = 'unit-selected';
  tempUnitF.classList = 'unit-not-selected';
  tempUnit = 'Celsius';
  getTemperatures(event);
});

tempUnitF.addEventListener('click', (event) => {
  tempUnitF.classList = 'unit-selected';
  tempUnitC.classList = 'unit-not-selected';
  tempUnit = 'Fahrenheit';
  getTemperatures(event);
});
