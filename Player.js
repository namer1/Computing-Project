var player = {
    //lists that I don't want to be affected by the running of the functions, but only when they are called upon
    ghostplayer : [],
    userData : [],
    ghostplayerCount : 0,
    init : function(number){
        this.inWater = false; // the player is outside the water
        //width and height of the player
        this.width = 80;
        this.height = 80;
        // sets the initial speed of x & y axis
        this.speedY = INITIAL_SPEED_Y;
        this.speedX = INITIAL_SPEED_X;
        // sets where they are going to start at the begining of the game (and every new level)
        this.x = PLAYER_POS_X_INITIAL;
        this.y = PLAYER_POS_Y_INITIAL;
        this.images = [];// the list where the images will be stroed for the run of the game
        this.currentImg = START_POSITION; // tells the game at which image to start the game after they are all loaded
        for (var i = 0; i <= number; i++){ // a for loop to load all of the images to the list
            this.images[i] = new Image();
            this.images[i].onload = function(i) {
                if (i == number - 1){ // once the images are loaded
                    game.init();
                    game.startLevel();
                }
            }.bind(this, i);
            this.images[i].src = `sprites/Surfer/NEW/${i}.png`; // tells the game where the images are stored
        }
        this.record = []; // the list that stores teh x, y & current img with every game loop to be sued later on in the ghost player
        
    },
    keyPress : function(){ // when a key is being pressed
        document.addEventListener("keydown", function(event){ // detects that a key was pressed
            if (event.keyCode == PAUSED){ // this is the pause button (letter p)
                timer.pause(); // the pause function in timer
            }
            if (timer.paused){ // if teh paused variable is true
                return; // leave the current function you are in
            }
            if (event.keyCode == LEFT_ARROW){ // if the left arrow is pressed
                this.previousImage(); // use function previous image
                if (this.inWater){ // if the player is in the water
                    this.speedY = (ARROW_SPEED[this.currentImg]  + this.speedY)/2; // cahnge the speed of y according to the current image
                }
            }
            if (event.keyCode == RIGHT_ARROW){ // if hte right arrow is pressed
                this.nextImage(); // use function next image
                if (this.inWater){ // if the player is in the water
                    this.speedY = (ARROW_SPEED[this.currentImg]  + this.speedY)/2; // cahnge the speed of y according to the current image
                }
            }
        }.bind(this));

    },
    nextImage : function () { // moves to the next image in the list
        if(this.currentImg < PLAYER_MAX){ // if image number is smaller than the last image's
            if(this.currentImg != 9 || !this.inWater){ // if the player is in the water OR current image is not 9
                                                       // prevents the player from going beyong image number 9
                this.currentImg++; // adds 1 to the current image
            }
        }
        else {
            this.currentImg = PLAYER_MIN; // allows the plyaer to go in a loop
        }
    },
    previousImage : function () { // moves to the previous image in the list
        if(this.currentImg > PLAYER_MIN){ // if image number is smabiggerller than the first image's
            if(this.currentImg != 27 || !this.inWater){ // if the player is in the water OR current image is not 27
                                                        // prevents the player from going beyong image number 27
                this.currentImg--; // removes 1 to the current image
            }
        }
        else {
            this.currentImg = PLAYER_MAX; // allows the plyaer to go in a loop
        }
    }, 
    enterWater : function(){ // what to do when teh player is entering the water:
        if(this.y >= WAVE_POSITION - 20 && !this.inWater){ // if the player is currently outside the water and then he is entering
            scoring.outAir(); // runs a function that will award him with points
            if (crush.isUnderWave() || this.currentImg > 9 ){ // if the player did not land acording to the rules, then he lost
                gameOver.over() // gpes to the game over function
            }
            if (ENTER_WATER_SPEED[this.currentImg]) {
                this.speedY = ENTER_WATER_SPEED[this.currentImg]; // cahgnes the Y speed of the player when he is entering the water 
                                                                  // according to the current image
            }
            this.inWater = true; // the player is now inisde the water
            if(scoring.numberOfLoops > 0){ // if loops did occur
                this.speedY *= 2.5; // muliply Y speed of by 2.5
            }
            scoring.loopScore() // add points according to how many loops done
        }
        if(this.y < WAVE_POSITION - 20 && this.inWater){ // the player is now in the air
            scoring.inAir();
            this.inWater = false;
        }
		if (crush.isUnderWave() && this.y == WAVE_POSITION){ // if player has touched the curshing wave from the bottom
			gameOver.over() // player loses
		}
    },
    loop : function(){ // when the player is completing loops
        for (var i=0; i<LOOP_BREAKPOINTS.length; i++) { // a for loop to go through the list of points to know that the player
                                                        // has completed a loop
            if(this.currentImg == LOOP_BREAKPOINTS[i] && !this.inWater){ // if player is in the image that is in the list and in the air
                scoring.loopPositions[i] = true; // add true to a list
            }
        }
        if(scoring.loopPositions.indexOf(false) == -1){ // if there are no false in the list then it will give -1. 
                                                        // indexOf checks the position of an item in a list
            scoring.numberOfLoops++; // add 1 to number of loops variable
            scoring.resetLoopPositions(); // reset the list
        }
    },
    recordChanges : function(){
        this.record.push({x:this.x, y:this.y, imgNum: this.currentImg}); 
        // in each game loop the x & y coordinates and the current image (at that point) are added to the list 'record'
    }
}