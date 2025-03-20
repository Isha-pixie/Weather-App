<?php
/*Name: ISHA BHATTA
STUDENT ID:2408180*/
// Assuming 'city' is the key in the POST request
include 'connection.php';

// Assuming 'city' is the key in the POST request
if (isset($_POST['city'])) {
    // Retrieve the city value from the POST request
    $city = $_POST['city'];
} else {
    // Handle the case where 'city' is not set in the POST request
    echo "City not specified";
    exit;
}

// SQL query to fetch weather data for the specified city
$query = "SELECT datetime, temperature, weather_icon FROM weatherdt WHERE cityname = ? ORDER BY datetime DESC LIMIT 7";
$stmt = $mysqli->prepare($query);

// Bind the parameter to the prepared statement
$stmt->bind_param('s', $city);

// Execute the prepared statement
$stmt->execute();

// Get the result of the query
$result = $stmt->get_result();

// Initialize an array to store the fetched data
$data = [];

// Fetch each row from the result and store it in the data array
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Return the fetched data as JSON
echo json_encode($data);
