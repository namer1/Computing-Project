<?php
header('Access-Control-Allow-Origin: *');
require_once 'database.php';

$username = $_POST["username"];
$password = password_hash($_POST["password"], PASSWORD_DEFAULT); // puts the passwords that hte user has inputted into the registration form in hased form

$create_user = $database->query("INSERT INTO users (username, password) VALUES ('$username', '$password')"); // creates a user in database
if ($database->affected_rows == 0){ // did somehing change --> if something between the regisration and the upload to the database changed
    echo "error";
    header("Location: /");
}
else {
    echo "registration complete";
    header("Location: /");
}
