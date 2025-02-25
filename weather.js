const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const defaultLocation = 'New York'; // Default location

const loadingIndicator = document.createElement('div'); // Create loading indicator
loadingIndicator.textContent = 'Loading...'; // Set loading text
loadingIndicator.style.display = 'none'; // Initially hidden
document.body.appendChild(loadingIndicator); // Add to body

const fetchWeatherButton = document.getElementById('fetchWeather');
const weatherResult = document.getElementById('weatherResult');

fetchWeatherButton.addEventListener('click', () => {
    const locationInput = document.getElementById('locationInput').value;
    fetchWeatherData(locationInput || defaultLocation); // Use default location if input is empty

    loadingIndicator.style.display = 'block'; // Show loading indicator

});

function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},IN&appid=${apiKey}&units=metric`; // Added country code for Tamil Nadu


    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            loadingIndicator.style.display = 'none'; // Hide loading indicator
            displayWeather(data);

        })
        .catch(error => {
            loadingIndicator.style.display = 'none'; // Hide loading indicator
            weatherResult.textContent = 'Error: ' + error.message + '. Please check the location and try again.'; // More user-friendly error message


        });
}

function displayWeather(data) {
            const { name, main, weather, wind } = data;

    weatherResult.innerHTML = ` 
        <h2>Weather in ${name}</h2>

        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Condition: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>

    `;
}
