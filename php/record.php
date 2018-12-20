<?php
header('Access-Control-Allow-Origin: *');
require_once 'database.php';
$file = $_POST["file"];

var_dump($file); // everything in the variable
$database->query("UPDATE `ghostplayer` SET text = '$file', _updated=NOW()"); // if data is empty than there won't be any chagnes because UPDATE means that somethng needs to be there

if ($database->affected_rows == 0) { // if the prevous query did not work (if database is empty)
    $database->query("INSERT INTO `ghostplayer` (text, _updated) VALUES ('$file', NOW())");
}
?>