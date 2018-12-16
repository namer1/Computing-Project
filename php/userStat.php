<?php
session_start();
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");

$all_data = $database->query("SELECT * FROM games WHERE user_id = ".$_SESSION['user_id']);

$to_print = [];
while ($row = $all_data->fetch_assoc()) {
    $to_print[] = $row; // adding to list
}

echo json_encode($to_print);