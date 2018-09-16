<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");
$username = $_POST["username"]; //find me he information that is in the ""
$time = $_POST["time"]; //find me he information that is in the ""
$points = $_POST["points"]; //find me he information that is in the ""

var_dump($_GET);

$database->query("INSERT INTO `scores` (username, time, points) VALUES ('$username', $time, $points)");

