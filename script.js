const API_KEY = "4e479aec8f05fd41a979cbc99ad69730";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = `<p class="error">Please enter a city name.</p>`;
        return;
    }

    try {
        result.innerHTML = `<p>Loading...</p>`;

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();

        console.log("Status:", response.status);
        console.log("API Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        result.innerHTML = `
            <h2>${data.name}</h2>

            <div class="temperature">
                ${data.main.temp}°C
            </div>

            <p>💧 Humidity: ${data.main.humidity}%</p>

            <p class="condition">
                🌤️ ${data.weather[0].description}
            </p>
        `;

    } catch (error) {

        result.innerHTML = `
            <p class="error">
                ❌ ${error.message}
            </p>
        `;
    }
}