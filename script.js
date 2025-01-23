
let w_City = document.querySelector('.weather_city');
let date_time = document.querySelector('.weather_date_time');
let forecast = document.querySelector('.weather_forecast');
let icon = document.querySelector('.weather_icon');
let temperature = document.querySelector('.weather_temperature');
let min = document.querySelector('.weather_min');
let max = document.querySelector('.weather_max');
let feels_like = document.querySelector('.weather_feelsLike');
let humidity = document.querySelector('.weather_humidity');
let Wind = document.querySelector('.weather_wind');
let pressure = document.querySelector('.weather_pressure');
let citySearch = document.querySelector('.weather_search');



const getCountryName = (code) =>{
    const regionNamesInEnglish = new Intl.DisplayNames([code], { type: 'region' });
    return regionNamesInEnglish.of(code);
}

const getDateTime = (dt) =>{
    const currentData = new Date(dt * 1000);
    const options = {
        year: "numeric",
        month: "long",
        date: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(currentData);
}

citySearch.addEventListener('submit', (event) =>{
    event.preventDefault();

    let inputSearch = document.querySelector('.city_name');
    console.log(inputSearch.value)
    city = inputSearch.value;
    inputSearch.value = "";
    getWeatherData()
})

let city = "alwar";
const getWeatherData = async() =>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=75c1fca3ef1bbf9d035b1f704eef6409`;
    
    try{
        const res = await fetch(weatherUrl,{
            headers: {
                Accept: "application/json",
            },
        });
        const data = await res.json();

        const {weather, main, sys, dt, wind, name } = data; w_City.innerHTML = `${name} ${getCountryName(sys.country)}`;
        date_time.innerHTML = getDateTime(dt);
        forecast.innerHTML = `${weather[0].main}`;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        temperature.innerHTML = main.temp;
        min.innerHTML = `Min ${(main.temp_min).toFixed()}&#176`;
        max.innerHTML = `Max ${(main.temp_max).toFixed()}&#176`;
        feels_like.innerHTML = `${(main.feels_like).toFixed()}&#176`
        humidity.innerHTML = `${(main.humidity).toFixed()}%`
        Wind.innerHTML = `${(wind.speed)} m/s`
        pressure.innerHTML = `${(main.pressure).toFixed()} hpa`
        
   }
   catch(error){
    console.log(error);
   }

   

}

document.body.addEventListener('load', getWeatherData());