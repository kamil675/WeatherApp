document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = '3d3b63c422103960bed4575c05987bc2';  // Yahan apni API key daalein
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then((data) => {
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const temp = (data.main.temp - 273.15).toFixed(2); // Kelvin to Celsius
      const cityName = data.name;
      const timezoneOffset = data.timezone; // in seconds

      // Calculate local time
      const now = new Date();
      const localTime = new Date(now.getTime() + timezoneOffset * 1000);
      const timeStr = localTime.toUTCString().slice(17, 25);

      document.getElementById("errorMessage").style.display = "none";
      document.getElementById("weatherDetails").innerHTML = `
        <h2>${cityName}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon"/>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Condition:</strong> ${weather}</p>
        <p><strong>Local Time:</strong> ${timeStr}</p>
      `;

      gsap.from(".weather-details", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out"
      });
    })
    .catch((error) => {
      showError("City not found. Please try again.");
    });
}

function showError(message) {
  const errorElement = document.getElementById("errorMessage");
  errorElement.textContent = message;
  errorElement.style.display = "block";
  document.getElementById("weatherDetails").innerHTML = "";
}

// GSAP animation for header
gsap.from("#heading", {
  duration: 1.5,
  y: -50,
  opacity: 0,
  ease: "bounce"
});
