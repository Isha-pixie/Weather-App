<?php
/*Name: ISHA BHATTA
STUDENT ID:2408180*/
include 'connection.php';

if ($_POST) {
    // Receives the json data using POST method
    $weatherData = $_POST['weatherdata'];
    $weatherArray = json_decode($weatherData, true);

    // Extract the necessary weather information
    $cityname = $weatherArray['name'];
    $datetime = date('Y-m-d', $weatherArray['dt']); // Only date part

    // Check if a record with the same cityname and date already exists
    $checkQuery = "SELECT * FROM weatherdt WHERE cityname = ? AND DATE(datetime) = ?";
    //p
    $checkStmt = $mysqli->prepare($checkQuery);
    $checkStmt->bind_param('ss', $cityname, $datetime);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows == 0) {
        // Record does not exist, proceed with insertion
        $temperature = $weatherArray['main']['temp'];
        $humidity = $weatherArray['main']['humidity'];
        $windspeed = $weatherArray['wind']['speed'];
        $pressure = $weatherArray['main']['pressure'];
        $datetime = date('Y-m-d', $weatherArray['dt']); // Full date-time
        $weather_icon = $weatherArray['weather'][0]['icon'];

        // Prepare the SQL statement for insertion
        $stmt = $mysqli->prepare("INSERT INTO weatherdt(cityname, temperature, humidity, windspeed, pressure, datetime, weather_icon) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            die("Statement preparation failed: " . $mysqli->error);
        }

        // Bind the parameters to the statement
        $stmt->bind_param('sdidiss', $cityname, $temperature, $humidity, $windspeed, $pressure, $datetime, $weather_icon);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Data inserted successfully!";
        } else {
            echo "Error inserting data: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        // Record exists, do not insert
        echo "Data for this date and city already exists.";
        die;
    }
}
