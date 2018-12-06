var game = {
    gameOver: false,
    currentLvl: -1,
    init : function(){ // only happen once
        this.canvas = document.getElementById("Game");
        this.render = this.canvas.getContext("2d"); //allows to draw to the screen
        this.gameLoop = setInterval(this.draw.bind(this), 20); // 20 miliseconds per interval. BIND connects to the game variable
        this.backgroundSwitcher = setInterval(background.switch.bind(background), 200); // for the change in the waves
        player.keyPress();
        window.addEventListener("resize", startScreen.calculateCanvas.bind(startScreen))
        scoring.init();
    },
    startLevel: function() { // happens at the begnning of every level
        if (this.currentLvl < lvls.length-1){ // check how many more levels left in the game
            this.currentLvl++; // add 1 to the level so that the next time the function is ran, the game will load the next level
            background.init();
            timer.init(lvls[game.currentLvl].time); // how long the level is
            if (lvls[game.currentLvl].shouldLoadWave) {
                crush.init();
            } // makes sure to check if the crushing wave should load at the current level
            this.obstacles = []; // making a list so that there will be able to be more than one obstacle at a time
            this.obstacles.push(new Obstacle()); // loads the obstacles to the list
            player.x = PLAYER_POS_X_INITIAL; player.y = PLAYER_POS_Y_INITIAL; player.currentImg = START_POSITION;
            player.speedY = 0; player.speedX = 0.2; // resets the position of the player at the begining of every level
        }
        else{
            gameOver.over(); // if there are no more levels at the ed of the previous level, then the game will take the
                             // player to the game over screen
        }
    },
    update : function(){ // as long as it is not game over then the function will run 
                         // --> makes sure that it keeps happenign constantly, not once --> it runs over and over again until game over
        background.scrollX();
        gravity.grav();
        player.x += player.speedX;
        player.enterWater();
        if (player.inWater && crush.isUnderWave()){
            scoring.inWave();
        }
        crush.crushBedrock();
        background.scrollY();
        crush.move();
        player.loop();
        this.obstacles.forEach(function(o){
            o.move(); // keep the obstacle moveing
            o.collisionTest()
        })
        player.recordChanges(); // used to upload the x, y & current image to the list which then will be uploaded to the databse i JSON form
        player.ghostplayerCount++; // this is used to tell the game to move the next set of coordinates in the list

    },
    clear : function(){
        this.render.clearRect(0, 0, this.canvas.width, this.canvas.height); // reset the screen
    },
    draw : function(){
        this.clear(); // used to remove everything from the screen and then the game draws again. this is instead of drawing over existing pictures
        
        if (background.backgroundSwitch){
            this.render.drawImage(background.sea,0,0,background.sea.width,background.sea.height,background.x,0,background.sea.width,this.canvas.height);
            this.render.drawImage(background.sea,0,0,background.sea.width,background.sea.height,background.x + background.sea.width,0,background.sea.width,this.canvas.height);    
            this.render.drawImage(background.day, 0,-45);
            this.render.drawImage(background.wave,0,0,background.wave.width,background.wave.height,background.x,background.waveLvl,background.wave.width,this.canvas.height - WAVE_POSITION);
            this.render.drawImage(background.wave,0,0,background.wave.width,background.wave.height,background.x + background.wave.width,background.waveLvl,background.wave.width,this.canvas.height - WAVE_POSITION);
        }
        else{
            this.render.drawImage(background.sea,0,0,background.sea.width,background.sea.height,background.x,0,background.sea.width,this.canvas.height);
            this.render.drawImage(background.sea,0,0,background.sea.width,background.sea.height,background.x + background.sea.width,0,background.sea.width,this.canvas.height);    
            this.render.drawImage(background.day, 0,-45);
            this.render.drawImage(background.wave2,0,0,background.wave2.width,background.wave2.height,background.x,background.waveLvl,background.wave2.width,this.canvas.height - WAVE_POSITION);
            this.render.drawImage(background.wave2,0,0,background.wave2.width,background.wave2.height,background.x + background.wave2.width,background.waveLvl,background.wave2.width,this.canvas.height - WAVE_POSITION);
        }
        // this if statement is using the 2 different set of images of the wave. This means that through the if statement,
        // I am switching between the 2 pictures and therefore, making the game looks mroe realistic

        this.obstacles.forEach(function(o){
            this.render.drawImage(o.image, 0,0, o.image.width, o.image.height, o.x, o.y, o.image.width, o.image.height);
        }.bind(this)) // here I am drawing the obstacles. there are no set numbers because each picutre has a different stting and therefore,
                      // will need to be drawn elsewehre
        
        if (this.gameOver) { // this is what happens when the player loses
            gameOver.display(); // draws the game over screen
            clearInterval(game.gameLoop); // this stops the running of the game while only keeping the game over loop
                                          // this is used to make sure the gameOver.display() runs only once and no game functions will run
        }
        else { // as long as the player is still playng and did not lose
            this.update(); // run the update function
            this.render.drawImage(player.images[player.currentImg], player.x, player.y); // this will draw the player function with the possibality of changing the current image
            var coordinate = player.ghostplayer[player.ghostplayerCount]; // this sets the variable of coordinates according to the ghostPlayerCount which is updating at every game loop
            if (coordinate && coordinate.x && coordinate.y && coordinate.imgNum != undefined){ // only if they exist will this happen -->
                                                                                               // making it so that even if the ghost player runs out in the middle of the game, there won't be an error
                this.render.globalAlpha = 0.5; // transparancy levels of the ghost player
                this.render.drawImage(player.images[coordinate.imgNum], coordinate.x, coordinate.y); // draws the ghost player with the data collected 
                this.render.globalAlpha = 1; // reutrns the transparency to normal so that it won't affect the normal player
            }
            if(lvls[game.currentLvl].loadShadow){ // this means that it will happen only at the 3rd level
                this.render.drawImage(player.shadow, 0, 0, player.shadow.width, player.shadow.height, -1350 + player.x - PLAYER_POS_X_INITIAL, -1300 + player.y - PLAYER_POS_Y_INITIAL, player.shadow.width, player.shadow.height)
                // drawing the shadows so that the cirlce that will allow the player to see what is aroud him is on hime with in the centre of it
                this.render.drawImage(player.moon, game.canvas.width - 300, 20) // this will draw the moon above the shadows so that the player can see the moon
            }
            if (crush.crushing) { // this draws the crushing wave to the screen
                this.render.drawImage(crush.crushing,0,0,crush.crushing.width,crush.crushing.height,crush.x,background.waveLvl,crush.crushing.width,this.canvas.height - WAVE_POSITION);
            }
            // this is for the text of the timer and score:
            this.render.font = "30px Arial"; 
            this.render.fillStyle = 'red';
            this.render.fillText(timer.format(),this.canvas.width-150,50);
            this.render.fillText(scoring.score, this.canvas.width - 250,50);   
             
        }
    },
}
