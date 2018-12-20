<?php
session_start();//the entire time on browser
header('Access-Control-Allow-Origin: *');
require_once 'database.php';

$username = $_POST["username"];
$password = $_POST["password"];

$find_user = $database->query("SELECT user_id, password FROM users WHERE username='$username'"); // checks if username matches
if ($find_user->num_rows == 0){ // user doesn't exist
    $_SESSION["login_msg"] = "Username does not exist";
    header("Location: /"); // sends back to the original page
}
else{ // user exists
    $user_details = $find_user->fetch_assoc(); //password
    if (password_verify($password, $user_details["password"])){ // checks if the 1st password matches the hased password in database
        $_SESSION["user_id"] = $user_details["user_id"];
        header('Location: /'); // send user back to original page
    }
    else{
        $_SESSION["login_msg"] = "Wrong password";
        header("Location: /");
    }
}