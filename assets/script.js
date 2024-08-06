//url for api fetch request 
const city = document.querySelector('#cityInput')
const state = document.querySelector('#stateInput')


//gets the latitude and longitude of the city the user inputs, then uses that in the openweather forecast api to display the 5 day forecast in that area
function weatherSearch() {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city.value},${state.value},USA&appid=2cb03be675108368292ea1fa37be4149`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let lat = data[0].lat
            let lon = data[0].lon
            console.log(data[0].lat, data[0].lon)
            const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&units=imperial&appid=2cb03be675108368292ea1fa37be4149`
            fetch(forecast)
                .then(response => response.json())
                .then(function (data) {
                    console.log(data)
                    console.log(data.list)
                    for (let i = 0; i < data.list.length; i++) {
                        console.log(data.list[i].dt_txt)
                    }

                })
        })
}

$('form').on('submit', function (event) {
    event.preventDefault();
    console.log(city.value)
    console.log(state.value)
    weatherSearch()
})