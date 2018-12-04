<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");
$file = $_POST["file"];
print_r($file);
var_dump($file);
$database->query("UPDATE `ghostplayer` SET text = '$file', _updated=NOW()");
//something does not work
?>