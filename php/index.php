<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");

$all_scores = $database->query("SELECT * FROM `scores`");

$to_print = [];
while ($row = $all_scores->fetch_assoc()) {
    $to_print[] = $row; // adding to list
}

echo json_encode($to_print);