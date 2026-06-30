async function getWeather(){

    const city = document.getElementById("city").value;

    if(city===""){
        alert("Enter a city name");
        return;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=f66d2cd577d54f14a0863529263006&q=${city}&days=3`;

    try{

        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("weather").innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <h3>${data.current.temp_c} °C</h3>
            <p>${data.current.condition.text}</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_kph} km/h</p>
        `;

        let forecastHTML = "";

        data.forecast.forecastday.forEach(day=>{
            forecastHTML += `
                <div class="card">
                    <h4>${day.date}</h4>
                    <img src="https:${day.day.condition.icon}">
                    <p>${day.day.avgtemp_c} °C</p>
                </div>
            `;
        });

        document.getElementById("forecast").innerHTML = forecastHTML;

    }catch(error){
        document.getElementById("weather").innerHTML="<p>City not found!</p>";
    }
}