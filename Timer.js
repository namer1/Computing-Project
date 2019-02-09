var timer = {
    init : function(lvlLength){ // lvlLength will determine the length of the level
        this.lvlLength = lvlLength;
        this.currentTime = lvlLength;
        this.paused = false; // game is not paused
        this.start(); // stats the game time
    },
    start : function(){
        this.gameTime = setInterval(this.tick.bind(this),1000);
    },
    tick : function(){
        if (this.currentTime == 0){ // whe time has run out
            this.stop(); // stop the value gameTime
            if (game.currentLvl < lvls.length-1){ // if there is another level
                alert("Go to next level"); // tell the user "Go to the next level"
                game.startLevel(); // start that level
                userCalc.adjustDifficulty(); // chagne the difficulty of the game
            }
            else{ // if there are no more levels
                alert("Finished the game. Well Done!") // tell the user game is finished
                gameOver.over(); // player is taken to the game over screen
            }
        }
        else{
            this.currentTime -= 1; // if time has not run out, remove 1 from it
        }
    },
    stop : function(){
        clearInterval(this.gameTime); // stops the clock of the game
    },
    format : function(){
        var mins = Math.floor(this.currentTime/60); // divides the current time by 60 --> gives minutes
        var sec = this.currentTime%60; // takes the reminder of the current time/60 --> gives seconds 
        return mins.toString().padStart(2,"0") + ":" + sec.toString().padStart(2,"0"); // fomrat it in a clock format - min:sec
    },
    pause : function(){ // what to do when the game is paused
        if (this.paused){ // game is already paused and P is pressed again
            this.start(); // use the start buton
            this.paused = false; // game is no longer paused
            game.addOb = setInterval(function(){ // starts the obstacles timer
                game.obstacles.push(new Obstacle())
            }, game.time);
            game.gameLoop = setInterval(game.draw.bind(game), 20); // 20 miliseconds per interval. BIND connects to the game variable
            game.backgroundSwitcher = setInterval(background.switch.bind(background), 200); // for the change in the waves
        }
        else{ // when the P butto is pressed to stop the game
            this.stop(); // stops the clock of the game
            this.paused = true; //game is now paused
            // stop the clocks:
            clearInterval(game.addOb); 
            clearInterval(game.gameLoop);
            clearInterval(game.backgroundSwitcher);
        }
    }
}