var background = {
    init : function(){
        this.x = 0;
        this.waveLvl = WAVE_POSITION;
        this.wave = new Image();
        this.wave2 = new Image();
        this.sea = new Image();
        this.day = new Image();
        // here I am seeting the variables as images (and not boolean...)
        this.wave.onload = function() {
            this.scrollX();
        }.bind(this); // this means that once the wave is loaded onto the game, it will start moveing across the screen
        this.wave.src = lvls[game.currentLvl].background1;
        this.wave2.src = lvls[game.currentLvl].background2;
        this.sea.src = lvls[game.currentLvl].sea;
        this.day.src = lvls[game.currentLvl].day;
        // here I am telling the image varaible where to find the image. however, the location of teh image is not set here,
        // it is a link to a list that has different settings for each level, and the image is set according to the level
        this.backgroundSwitch = false;
        this.currentScrollSpeed = 0;
    },
    scrollX : function(){
        if (this.x + this.wave.width <= 0){
            this.x = 0; // resets the location of the wave when the whole of the wave is outside the screen
                        // images are checked for location on the top left corner of the image
        }
        var offSet = (player.currentImg >= 27) ? 36 - player.currentImg : player.currentImg; // Ternary Operator--> instead of an if statement (condition) ? if : else;
        offSet = (player.currentImg > 9) ? 0 : offSet;
        // get 0 - 9 in all cases of player in water
        this.currentScrollSpeed = BACKGROUND_SCROLL_X/(offSet/18 + 1); 
        // calculate a variable in the movement of the background according to the player's current image
        this.x = this.x - (this.currentScrollSpeed * (1 + userCalc.difficulty));
        // this will move the background according to the player's current image and the difficulty
    },
    scrollY : function(){
        if(player.y < WAVE_POSITION){
            this.waveLvl = WAVE_POSITION*2 - player.y;            
        } // if the player is above the set position of the wave, then the game will lower the wave so it looks like the player is the 
          //focus of attention and not the wave
        else{
            this.waveLvl = WAVE_POSITION; // if the player is in the water then the wave levels will be as set in the constant page
        }
        // makes it so that the player is the focus of the camera instead of the waves
    },
    switch : function(){
        this.backgroundSwitch = !this.backgroundSwitch // this is used to swap between the 2 images of the wave so it lookes like 
                                                       //the wave is constantly moving around
    },
}