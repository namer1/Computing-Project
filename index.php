<?php
session_start();
?>

<html>
    <head>
        <title>My Game</title>
        <style>
        body {background-color: powderblue;}
        /* #password {position: relative;
                left: 100px;
                top: 150px;}       
        #username{position: relative;
                left: 200px;
                top: 150px;} */
        </style>
    </head>
    <body style="margin: 0%">
        <canvas id="Game"></canvas>
        <script src="constants.js"></script>
        <script src="Levels.js"></script>
        <script src="Obstacles.js"></script>
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
            if($_SESSION["login_msg"]){
                echo $_SESSION["login_msg"]."<br>";
                $_SESSION["login_msg"] = false;
                session_destroy();
            }
            echo "<form method=\"POST\" action=\"php/login.php\">
            <input placeholder=\"username\" type=\"text\" name=\"username\" id=\"username\">
            <input placeholder=\"password\" type=\"password\" name=\"password\" id=\"password\">
            <input type=\"submit\" value=\"login\" id=\"button\">
            </form>
            <a href=\"register.html\">click here to regitser</a>";

        }
        ?>
        
    </body>
</html>