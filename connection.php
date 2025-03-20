
<?php
/*Name: ISHA BHATTA
STUDENT ID:2408180*/
// Database connection parameters
$servername = "localhost"; // Server name
$username = "root"; // Database username
$password = ""; // Database password
$dbname = "WeatherApp"; // Database name

// Create a connection to the database
$mysqli = mysqli_connect($servername, $username, $password, $dbname);

// Check if the connection was successful
if (!$mysqli) {
    // If the connection failed, print an error message and terminate the script
    die("Connection failed: " . mysqli_connect_error());
}
/*If the connection is successful, $mysqli is now the database connection object
 You can perform database operations using this connection
 (Add your database operations or queries here) */
