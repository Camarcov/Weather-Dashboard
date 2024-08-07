//url for api fetch request 
const city = document.querySelector('#cityInput')

//gets the latitude and longitude of the city the user inputs, then uses that in the openweather forecast api to display the 5 day forecast in that area
function weatherSearch() {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=2cb03be675108368292ea1fa37be4149`)
        .then(response => response.json())
        .then(data => {
            let lat = data[0].lat
            let lon = data[0].lon
            const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=2cb03be675108368292ea1fa37be4149`
            currentWeather(lat, lon)
            fetch(forecast)
                .then(response => response.json())
                .then((data => {
                    renderFiveDay(data)
                }))
        })
}

function renderFiveDay(data) {
    const fiveDayforecast = data.list;

    // filters out all data that doesnt match the 12pm timestamp
    const dailyForecast = fiveDayforecast.filter((item) =>
        item.dt_txt.includes("12:00:00")
    );

    //for each item in the daily forecast makes card with the text set to forecast conditions
    dailyForecast.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const temp = item.main.temp + ' °F'
        const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
        const desc = item.weather[0].description
        const wind = item.wind.speed
        const humidity = item.main.humidity

        const forecastCard = document.createElement("div");
        forecastCard.className = "forecastCard";

        forecastCard.innerHTML = `
        <p>${date}</p>
        <img src="${icon}" alt="Weather icon" />
        <p>Temp: ${temp}</p>
        <p>${desc}</p>
        <p>Winds: ${wind} mph</p>
        <p>${humidity}% Humidity </p>
      `;
        document.querySelector('#forecast').append(forecastCard)
    })
}

//fetches the current weather for the location you searched, adds all the conditions to the currentCity box
function currentWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=2cb03be675108368292ea1fa37be4149`)
        .then(response => response.json())
        .then(data => {
            const currentCity = document.querySelector('#currentCity');

            const h2 = document.createElement('h2');
            h2.textContent = 'Current Conditions for ' + data.name;
            currentCity.appendChild(h2);

            const weatherConditions = document.createElement('p');
            weatherConditions.textContent = 'Conditions: ' + data.weather[0].description;
            currentCity.appendChild(weatherConditions);

            const temp = document.createElement('p');
            temp.textContent = 'Temperature: ' + data.main.temp + ' °F';
            currentCity.appendChild(temp);

            const humidity = document.createElement('p');
            humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
            currentCity.appendChild(humidity);

            const wind = document.createElement('p');
            wind.textContent = 'Wind Speeds: ' + data.wind.speed + ' mph';
            currentCity.appendChild(wind);

            const icon = document.createElement('img');
            icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            currentCity.appendChild(icon);
            
            city.value = ''
        });
}

$('form').on('submit', function (event) {
    event.preventDefault();
    weatherSearch()
})