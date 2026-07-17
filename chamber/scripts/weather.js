const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.querySelector('.forecast-days');

const lat = 40.5069;
const lon = -111.4133;
const apiKey = '4214f6ab8b34560807aed01b8020eb5e';

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getCurrentWeather() {
    try {
        const response = await fetch(currentUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrent(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrent(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;
    const desc = data.weather[0].description;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

function displayForecast(data) {
    // Grab one forecast entry per day, close to noon, skipping today
    const dailyForecasts = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));

    // Only take the next 3 days
    const nextThreeDays = dailyForecasts.slice(0, 3);

    const html = nextThreeDays.map(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        return `
            <div class="forecast-day">
                <h3>${dayName}</h3>
                <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                <p>${Math.round(day.main.temp)}&deg;F</p>
                <p>${day.weather[0].description}</p>
            </div>
        `;
    }).join('');

    forecastContainer.innerHTML = html;
}

getCurrentWeather();
getForecast();