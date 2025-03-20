/*Name: ISHA BHATTA
STUDENT ID:2408180*/
127.0.0.1/weatherapp/weatherdt/		http://localhost/phpmyadmin/index.php?route=/table/sql&db=weatherapp&table=weatherdt
Your SQL query has been executed successfully.

show create table weatherdt;



weatherdt	CREATE TABLE `weatherdt` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `cityname` varchar(255) NOT NULL,
 `temperature` decimal(5,2) NOT NULL,
 `humidity` int(11) NOT NULL,
 `windspeed` decimal(5,2) NOT NULL,
 `pressure` int(11) NOT NULL,
 `datetime` date DEFAULT NULL,
 `weather_icon` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci	


