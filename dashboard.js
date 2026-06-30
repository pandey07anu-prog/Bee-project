console.log("Dashboard JS loaded");

window.getWeather = async function () {

    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Please enter city");
        return;
    }

    document.getElementById("weather").innerHTML = "Loading...";

    const url = `https://api.weatherapi.com/v1/forecast.json?key=f66d2cd577d54f14a0863529263006&q=${city}&days=3`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
            document.getElementById("weather").innerHTML = data.error.message;
            return;
        }

        document.getElementById("weather").innerHTML = `
            <h3>${data.location.name}</h3>
            <h2>${data.current.temp_c}°C</h2>
            <p>${data.current.condition.text}</p>
        `;

        let html = "";

        data.forecast.forecastday.forEach(day => {
            html += `
                <div class="card">
                    <p>${day.date}</p>
                    <p>${day.day.avgtemp_c}°C</p>
                </div>
            `;
        });

        document.getElementById("forecast").innerHTML = html;

    } catch (err) {
        console.log(err);
        document.getElementById("weather").innerHTML = "Error fetching data";
    }
};