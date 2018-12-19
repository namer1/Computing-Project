<?php
session_start();
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");
$user_id = $_SESSION["user_id"];
$username = $_POST["username"]; //find me the information that is in the ""
$level = $_POST["level"];
$points = $_POST["points"];

if($user_id == -1){ // user is not signed in
    $database->query("INSERT INTO `users` (username) VALUES ('$username')");
    $new_userid = $database->insert_id;
}
else{ // user is signed in
    $new_userid = $user_id;
}
$database->query("INSERT INTO `games` (user_id, points, level) VALUES ($new_userid, $points, $level)"); // adds the data to the user that is currently signed in
echo $new_userid;