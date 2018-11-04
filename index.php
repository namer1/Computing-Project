<?php
session_start();
?>

<html>
    <head>
        <title>My Game</title>
    </head>
    <body style="margin: 0%">
        <canvas id="Game"></canvas>
        <script src="constants.js"></script>
        <script src="Levels.js"></script>
        <script src="Animal.js"></script>
        <script src="Player.js"></script>
        <script src="PlayerSpeed.js"></script>  
        <script src="Game.js"></script>
        <script src="Background.js"></script>
        <script src ="Timer.js"></script>
        <script src="Scoring.js"></script>
        <script src="Crush.js"></script>
        <script src="Gravity.js"></script>
        <script src="StartScreen.js"></script>
        <script src="Server.js"></script>
        <script src="GameOver.js"></script>

        <?php
        if($_SESSION["user_id"]){
            echo  "<script>startScreen.display()</script>";
        }
        else{
            echo "<form method=\"POST\" action=\"php/login.php\">
            <input type=\"text\" name=\"username\">
            <input type=\"password\" name=\"password\"> <!-- shows circles instead of text-->
            <input type=\"submit\" value=\"login\">
            </form>";
        }
        ?>
    </body>
</html>