<?php
$cleardb_url      = parse_url(getenv("CLEARDB_DATABASE_URL"));
$cleardb_server   = $cleardb_url["host"];
$cleardb_username = "bf084bfcc037a9";
$cleardb_password = "7aa72a8e";
$cleardb_db       = substr($cleardb_url["path"],1);
//$database = new mysqli("localhost", "root", "123567", "surfing"); // have the database locally
$database = new mysqli($cleardb_server, $cleardb_username, $cleardb_password, $cleardb_db); // have the database live
?>