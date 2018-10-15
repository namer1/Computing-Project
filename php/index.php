<?php
header('Access-Control-Allow-Origin: *');
$database = new mysqli("localhost", "root", "123567", "surfing");

$all_scores = $database->query(
    "SELECT users.username, games.user_id, games.points, games.level FROM
    (SELECT user_id, MAX(points) AS points FROM `games`
    GROUP BY user_id) AS max_scores
    JOIN `games` ON max_scores.user_id = games.user_id AND max_scores.points = games.points
    JOIN `users` ON games.user_id = users.user_id
    ORDER BY points DESC LIMIT 10"); //DESC means in biggest to smallest (descending)

// ANOTHER QUERY WHERE IF PLAYER TOP SCORE ISN'T IN TOP 10 IT WILL STILL SHOW
// BUT ONLY TO PLAYER BELOW THE TOP 10 AND HOW MANY POINTS HE HAS
$private_score = $database->query(
    "SELECT users.username, games.user_id, games.points, games.level FROM
    (SELECT user_id, MAX(points) AS points FROM `games`
    GROUP BY user_id) AS max_scores
    WHERE games.user_id = users.user_id"
)
$to_print = [];
$sec_print = [];
while ($row = $all_scores->fetch_assoc()) {
    $to_print[] = $row; // adding to list
}
while ($row = $private_score->fetch_assoc()) {
    $sec_print[] = $row; // adding to list
}

echo json_encode($to_print);
echo json_encode($sec_print);