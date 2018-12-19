<?php
session_start();
// if logout button is pressed
unset($_SESSION["user_id"]); // stop the signning in session
session_destroy();
header("Location: /"); // send back to the original page
?>