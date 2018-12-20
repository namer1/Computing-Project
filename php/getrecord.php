<?php
header('Access-Control-Allow-Origin: *');
require_once 'database.php';
$row = $database->query("SELECT text FROM ghostplayer")->fetch_assoc();// fetch_assoc provides the next row

echo $row["text"]; // gives the coordinates
//PHP IS NOT WORKING --> GIVES AN EMPTY LIST --> ECHO DOES WORK