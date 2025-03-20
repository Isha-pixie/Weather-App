/*Name: ISHA BHATTA
STUDENT ID:2408180*/
window.onload = () => {
    // API Key for OpenWeatherMap API
    const apiKey = "8503243287eef37083319f681b4878c9";
    // Reference to the search input field
    const searchInput = document.querySelector("#search-txt");
    // Reference to the search button
    const searchButton = document.getElementById("search-btn");
    // Default city
    city = "Barasat"

    
    // Function to fetch current weather data
    async function fetchWeatherData(city) {
         // API endpoint for current weather
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();


        const mainIcon = document.querySelector(".main_icon");
        if (data.weather && data.weather[0] && data.weather[0].icon) {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            mainIcon.src = iconUrl;
            mainIcon.alt = `Weather Icon for ${data.name}`;
        } else {
            // Set a default icon or handle the case where there is no icon data
            mainIcon.src = 'path_to_default_icon.png';
            mainIcon.alt = 'No weather icon';
        }

        // Sends data to database
        saveDataToDB(data);
        fetchWeather(data.name);

        

        // Display weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
        document.querySelector(".pressure").innerHTML = data.main.pressure + "pa";
        
       
        // Display the current date and time
        const now = new Date();
        document.querySelector(".date-time").innerHTML = now.toLocaleString();

        // Send data to receiver.php
        await fetch('receiver.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }


    // Saves the data object in the database by creating a POST request
    function saveDataToDB(weatherdata) {
        var xhr = new XMLHttpRequest();
        var data = "weatherdata=" + JSON.stringify(weatherdata);
        xhr.open('POST', 'receiver.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
        xhr.send(data);
    }


    // Function to fetch weather forecast data
    function fetchWeather(city) {
        fetch('fetchWeatherData.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `city=${encodeURIComponent(city)}`
        })
        .then(response => response.json())
        .then(data => {
            // Assuming data is an array of weather data for 7 days
            for (let i = 0; i < 7; i++) {
                const dayData = data[i];
                const iconImg = document.getElementById(`icon-day-${i + 1}`);
                const detailsDiv = document.getElementById(`date-temp-day-${i + 1}`);
    
                if (dayData) {
                    const date = dayData.datetime || 'No History available';
                    const temperature = dayData.temperature || 'No History available';
                    const icon = dayData.weather_icon || 'No History available';
    
                    // Update the icon image
                    if (iconImg) {
                        iconImg.src = icon ? `http://openweathermap.org/img/wn/${icon}@4x.png` : 'path_to_default_icon.png';
                        iconImg.alt = `Weather Icon for ${date}`;
                    }
    
                    // Update the date and temperature details
                    if (detailsDiv) detailsDiv.textContent = ` ${date}  ${temperature} °C`;
                } else {
                    // Handle case where there is no data for this day
                    if (iconImg) {
                        iconImg.src = 'path_to_default_icon.png'; // Path to a default or placeholder icon
                        iconImg.alt = 'No weather icon available';
                    }
                    if (detailsDiv) detailsDiv.textContent = 'Date: No History Available, Temperature: No History Available';
                }
            }
        })
        .catch(error => console.error('Error:', error));
    }
    
    // Function to handle user-initiated weather search
    function searchWeather() {
        const city = searchInput.value.trim();
        if (city !== "") {
            fetchWeatherData(city);
            searchInput.value = '';
        } else {
            alert("Please enter a city name.");
        }
    }


    // Adding Event Listner to click
    searchButton.addEventListener("click", function (event) {
        console.log("Button clicked"); 
        searchWeather();
    });

    // Adding Event Listner to Enter
    searchInput.addEventListener("keyup", function (event) {
        console.log("Key pressed:", event.key); 
        if (event.key === "Enter") {
            console.log("Enter pressed"); 
            searchWeather();
        }
    });
    // Initial weather data fetch for the default city
    fetchWeatherData("Barasat");
};
