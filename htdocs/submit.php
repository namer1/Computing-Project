<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");
$username = $_POST["username"]; //find me the information that is in the ""
$time = $_POST["time"];
$points = $_POST["points"];
$loops = $_POST["loops"];

$database->query("INSERT INTO `scores` (username) VALUES ('$username')");
$database->query("INSERT INTO `game` (points, loops, time) VALUES ('$points, $loops, $time') ")

