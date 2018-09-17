<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");
$username = $_POST["username"]; //find me he information that is in the ""
$time = $_POST["time"]; //find me he information that is in the ""
$points = $_POST["points"]; //find me he information that is in the ""
$loops = $_POST["loops"];

$database->query("INSERT INTO `scores` (username, time, points, loops) VALUES ('$username', $time, $points, $loops)");

// ADD COLLECTION OF DATA OF HOW MANY LOOPS A PLAYER DOES
// ADD COLLECTION OF DATA OF HOW MUH TIME IS SPENT IN THE AIR & WATER