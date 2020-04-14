/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const tempUnitC = document.getElementById('unit-c');\nconst tempUnitF = document.getElementById('unit-f');\nlet tempUnit = 'Celsius';\nconst feedback = document.querySelector('.feedback');\nconst cityInput = document.getElementById('cityInput');\n\nvar BackgroundColor = '#4d4de8';\n  document.body.style.backgroundColor=BackgroundColor;\n\nclass AjaxWeather {\n  constructor() {\n    this.apiKey = '4ca238ef412c8bdca385ef94377ae6c8';\n  }\n\n  async getWeather(city) {\n    let url;\n    if (tempUnit === 'Celsius') {\n      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`;\n    } else {\n      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=imperial`;\n    }\n    const weatherData = await fetch(url);\n    const weather = await weatherData.json();\n    return weather;\n  }\n}\nclass Display {\n  constructor() {\n    this.results = document.querySelector('.results');\n    this.cityName = document.getElementById('cityName');\n    this.cityCountry = document.getElementById('cityCountry');\n    this.cityIcon = document.getElementById('cityIcon');\n    this.tempUnit = document.getElementById('tempUnit');\n    this.cityTemp = document.getElementById('cityTemp');\n    this.cityWeather = document.getElementById('cityWeather');\n    this.cityWeatherDesc = document.getElementById('cityWeatherDesc');\n    this.cityHumidity = document.getElementById('cityHumidity');\n  }\n\n  showWeather(data) {\n    console.log(data);\n    const {\n      name,\n      // weather: { main, description, icon },\n      sys: { country },\n      main: { temp, temp_min, temp_max, humidity },\n    } = data;\n    const { main } = data.weather[0];\n    const { description } = data.weather[0];\n    const { icon } = data.weather[0];\n\n    this.results.classList.add('showItem');\n    this.cityName.textContent = name;\n    this.cityCountry.textContent = country;\n    this.tempUnit.textContent = tempUnit;\n    this.cityTemp.textContent = temp;\n    this.cityHumidity.textContent = humidity;\n    this.cityWeather.textContent = main;\n    this.cityWeatherDesc.textContent = description;\n    this.cityIcon.src = `http://openweathermap.org/img/w/${icon}.png`;\n    // document.body.style.backgroundImage = 'url(\\'https://media1.giphy.com/media/VxbvpfaTTo3le/giphy.gif\\')';\n    const code = data.weather[0].icon;\n    document.body.style.backgroundColor='';\n    // document.body.b\n    // const code = '01d';\n    console.log(code);\n    \n  switch (code) {\n    case '01d':  \n    //   document.body.style.backgroundImage = 'url(\\'https://media1.giphy.com/media/VxbvpfaTTo3le/giphy.gif\\')';\n    document.body.style.backgroundImage = 'img/clearDay.jpg';\n   \n    break;\n    case '02d': \n      document.body.style.backgroundImage = 'url(\\'https://media1.giphy.com/media/pRQmCJ4pMXftS/giphy.gif\\')';\n    break;\n    case '03d':\n      document.body.style.backgroundImage = 'url(\\'https://giphy.com/gifs/sky-rolling-afternoon-uOuiK4F5zZkZ2\\')';\n    break;\n    case '04d':\n      document.body.style.backgroundImage = 'url(\\'https://data.whicdn.com/images/311386781/original.gif\\')';\n    break;\n    case '09d':\n      document.body.style.backgroundImage = 'url(\\'https://i.pinimg.com/originals/a4/fa/12/a4fa1253438edb2146cb1c6458d7d9dc.gif\\')';\n    break;\n    case '10d':\n      document.body.style.backgroundImage = 'url(\\'https://i.pinimg.com/originals/6f/2c/9f/6f2c9fdd7de3223063ad01bd53670a5d.gif\\')';\n    break;\n    case '11d':\n      document.body.style.backgroundImage = 'url(\\'https://data.whicdn.com/images/303275638/original.gif\\')';\n    break;\n    case '13d':\n      document.body.style.backgroundImage = 'url(\\'https://media.giphy.com/media/lMr6k5bqTTioM/giphy.gif\\')';\n    break;\n    case '50d':\n      document.body.style.backgroundImage = 'url(\\'https://thumbs.gfycat.com/LightHospitableDoe-size_restricted.gif\\')';\n    break;\n    case '01n':\n      document.body.style.backgroundImage = 'url(\\'https://data.whicdn.com/images/303306624/original.gif\\')';\n    break;\n    case '02n':\n      document.body.style.backgroundImage = 'url(\\'https://media.giphy.com/media/AtK6cr1n21uY8/giphy.gif\\')';\n    break;\n    case '03n':\n      document.body.style.backgroundImage = 'img/nightScattered.gif';\n    break;\n    case '04n':\n      document.body.style.backgroundImage = 'url(\\'https://thumbs.gfycat.com/ExcitableImperturbableEmperorshrimp-size_restricted.gif\\')';\n    break;\n    case '09n':\n      document.body.style.backgroundImage = 'url(\\'https://media2.giphy.com/media/RHjyppvaMzJGU/source.gif\\')';\n    break;\n    case '10n':\n      document.body.style.backgroundImage = 'url(\\'https://i.pinimg.com/originals/52/46/2a/52462a9f57dad91c7d80384bf737346c.gif\\')';\n    break;\n    case '11n':\n      document.body.style.backgroundImage = 'url(\\'https://media0.giphy.com/media/3o7TKs9TQX323TdQeA/source.gif\\')';\n    break;\n    case '13n':\n      document.body.style.backgroundImage = 'url(\\'https://media2.giphy.com/media/Jr0uBlFYhqNA4/giphy.gif\\')';\n    break;\n    case '50n':\n      document.body.style.backgroundImage = 'url(\\'https://media1.giphy.com/media/2AlpjchqgwIuc/giphy.gif\\')';\n    break;\n  }\n\n  }\n}\n\n\nfunction showFeedback(text) {\n  feedback.classList.add('showItem');\n  feedback.innerHTML = `<p>${text}</p>`;\n\n  setTimeout(() => {\n    feedback.classList.remove('showItem');\n  }, 3000);\n}\n\n\nconst ajax = new AjaxWeather();\nconst display = new Display();\n\nfunction getTemperatures(event) {\n  event.preventDefault();\n  const city = cityInput.value;\n  testBg();\n  if (city.length === 0) {\n    showFeedback('city value cannot be empty');\n  } else {\n    ajax.getWeather(city).then(data => {\n      if (data.message === 'city not found') {\n        showFeedback('city with such name cannot be found');\n      } else {\n        display.showWeather(data);\n      }\n    });\n  }\n}\n\n(function init() {\n  const form = document.getElementById('wheatherForm')\n  form.addEventListener('submit', getTemperatures);\n  \n}());\n\n\ntempUnitC.addEventListener('click', (event) => {\n  tempUnitC.classList = 'unit-selected';\n  tempUnitF.classList = 'unit-not-selected';\n  tempUnit = 'Celsius';\n  getTemperatures(event);\n});\n\ntempUnitF.addEventListener('click', (event) => {\n  tempUnitF.classList = 'unit-selected';\n  tempUnitC.classList = 'unit-not-selected';\n  tempUnit = 'Fahrenheit';\n  getTemperatures(event);\n});\n\nfunction testBg(){\n\nwcodes=['01d','01n','02d','02n','03d','03n','04d','04n','09d','09n','10d','10n','11d','11n','13d','13n','50d','50n'];\nwcodes.forEach ( function (code){\n  switch (code) {\n    case '01d':  \n      document.body.style.backgroundImage = 'url(\\'https://media1.giphy.com/media/VxbvpfaTTo3le/giphy.gif\\')';\n    break;\n    case '02d': \n      document.body.style.backgroundImage = 'url(\\'https://media1.giphy.com/media/pRQmCJ4pMXftS/giphy.gif\\')';\n    break;\n    case '03d':\n      document.body.style.backgroundImage = 'url(\\'https://data.whicdn.com/images/272241949/original.gif\\')';\n    break;\n    case '04d':\n      document.body.style.backgroundImage = 'url(\\'https://data.whicdn.com/images/311386781/original.gif\\')';\n    break;\n    case '09d':\n      document.body.style.backgroundImage = 'url(\\'https://i.pinimg.com/originals/a4/fa/12/a4fa1253438edb2146cb1c6458d7d9dc.gif\\')';\n    break;\n    case '10d':\n      document.body.style.backgroundImage = 'url(\\'https://i.pinimg.com/originals/6f/2c/9f/6f2c9fdd7de3223063ad01bd53670a5d.gif\\')';\n    break;\n    case '11d':\n      document.body.style.backgroundImage = 'url(\\'https://data.whicdn.com/images/303275638/original.gif\\')';\n    break;\n    case '13d':\n      document.body.style.backgroundImage = 'url(\\'https://media.giphy.com/media/lMr6k5bqTTioM/giphy.gif\\')';\n    break;\n    case '50d':\n      document.body.style.backgroundImage = 'url(\\'https://thumbs.gfycat.com/LightHospitableDoe-size_restricted.gif\\')';\n    break;\n    case '01n':\n      document.body.style.backgroundImage = 'url(\\'https://data.whicdn.com/images/303306624/original.gif\\')';\n    break;\n    case '02n':\n      document.body.style.backgroundImage = 'url(\\'https://media.giphy.com/media/AtK6cr1n21uY8/giphy.gif\\')';\n    break;\n    case '03n':\n      document.body.style.backgroundImage = 'url(\\'https://i.pinimg.com/originals/bd/2f/d5/bd2fd5e1c0dc8e485b184546a2e4c000.gif\\')';\n    break;\n    case '04n':\n      document.body.style.backgroundImage = 'url(\\'https://thumbs.gfycat.com/ExcitableImperturbableEmperorshrimp-size_restricted.gif\\')';\n    break;\n    case '09n':\n      document.body.style.backgroundImage = 'url(\\'https://media2.giphy.com/media/RHjyppvaMzJGU/source.gif\\')';\n    break;\n    case '10n':\n      document.body.style.backgroundImage = 'url(\\'https://i.pinimg.com/originals/52/46/2a/52462a9f57dad91c7d80384bf737346c.gif\\')';\n    break;\n    case '11n':\n      document.body.style.backgroundImage = 'url(\\'https://media0.giphy.com/media/3o7TKs9TQX323TdQeA/source.gif\\')';\n    break;\n    case '13n':\n      document.body.style.backgroundImage = 'url(\\'https://media2.giphy.com/media/Jr0uBlFYhqNA4/giphy.gif\\')';\n    break;\n    case '50n':\n      document.body.style.backgroundImage = 'url(\\'https://media1.giphy.com/media/2AlpjchqgwIuc/giphy.gif\\')';\n    break;\n  }\n});\n}\n\n  // weatherIcon.src = `https://openweathermap.org/img/wn/${code}@2x.png`;\n  // cityName.innerHTML = data.name + ', ' + data.sys.country;\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });