<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");

$row = $database->query("SELECT text FROM ghostplayer")->fetch_assoc();// fetch_assoc provides the next row

echo $row["text"]; // gives the coordinates