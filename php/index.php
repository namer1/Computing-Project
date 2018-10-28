<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");

$all_scores = $database->query(
    "(SELECT users.username, games.user_id, games.points, games.level FROM
    (SELECT user_id, MAX(points) AS points FROM `games`
    GROUP BY user_id) AS max_scores
    JOIN `games` ON max_scores.user_id = games.user_id AND max_scores.points = games.points
    JOIN `users` ON games.user_id = users.user_id
    ORDER BY points DESC LIMIT 10)
    UNION
    (SELECT users.username, games.user_id, games.points, games.level FROM
    users JOIN games ON users.user_id = games.user_id
    WHERE users.user_id = ".$_GET['user_id'].".
    ORDER BY points DESC LIMIT 1)"); //DESC means in biggest to smallest (descending)

$to_print = [];
while ($row = $all_scores->fetch_assoc()) {
    $to_print[] = $row; // adding to list
}

echo json_encode($to_print);