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
        <canvas id="Game"></canvas> <!--  when defining canvas in js files, it will connect to this-->
        <!-- each script line is another file that will be needed to run the game using a different function that is inbuilt in each file -->
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
        <script src="userCalc.js"></script>

        <?php
        if($_SESSION["user_id"]){ // if user is already connected or now connected:
            echo  "<script>startScreen.display()</script>"; // go to start screen
        }
        else{
            if($_SESSION["login_msg"]){ // if there is amessage for the user
                echo $_SESSION["login_msg"]."<br>"; // show it to the user then go to a new line
                session_destroy();
            }
            echo "<form method=\"POST\" action=\"php/login.php\">
            <input placeholder=\"username\" type=\"text\" name=\"username\" id=\"username\">
            <input placeholder=\"password\" type=\"password\" name=\"password\" id=\"password\">
            <input type=\"submit\" value=\"login\" id=\"button\">
            </form>
            <a href=\"register.html\">click here to regitser</a>";
            // creates the buttons that will have the username and password & the button that is incharge of log in
            // a link to the register page if necessary
        }
        ?>
    </body>
</html>