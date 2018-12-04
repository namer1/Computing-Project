<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");

$username = $_POST["username"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

$create_user = $database->query("INSERT INTO users (username, password) VALUES ('$username', '$password')"); // creates a user in database
if ($database->affected_rows == 0){ // did somehing change
    echo "error";
    header("Location: /");
}
else {
    echo "registration complete";
    header("Location: /");
}
