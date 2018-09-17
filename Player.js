var player = {
    init : function(number){
        this.inWater = false;
        this.speedY = 0;
        this.speedX = 0.2;
        this.x = PLAYER_POS_X_INITIAL;
        this.y = PLAYER_POS_Y_INITIAL;
        this.images = [];
        this.currentImg = START_POSITION;
        for (var i = 0; i <= number; i++){
            this.images[i] = new Image();
            this.images[i].onload = function(i) {
                if (i == number - 1){
                    game.start();
                }
            }.bind(this, i);
            this.images[i].src = `sprites/Surfer/NEW/${i}.png`;
        }
    },
    changeImage : function(newImage){
        this.currentImg = newImage; 
        
    },
    keyPress : function(){
        document.addEventListener("keydown", function(event){
            if (event.keyCode == PAUSED){
                timer.pause();
            }
            if (timer.paused){
                return; // leave the current function you are in
            }
            if (event.keyCode == LEFT_ARROW){ 
                this.previousImage();
                if (this.inWater){
                    this.speedY = ARROW_SPEED[this.currentImg];
                }
            }
            if (event.keyCode == RIGHT_ARROW){ 
                this.nextImage();
                if (this.inWater){
                    this.speedY = ARROW_SPEED[this.currentImg];
                }
            }
        }.bind(this));
    },
    nextImage : function () {
        if(this.currentImg < PLAYER_MAX){
            if(this.currentImg == 9 || this.currentImg == 27 && this.inWater){
                // once true, there is nothing to get it out of the if statement
            }
            else{
                this.currentImg++;
            }
        }
        else {
            this.currentImg = PLAYER_MIN;
        }
    },
    previousImage : function () {
        if(this.currentImg > PLAYER_MIN){
            if(this.currentImg == 9 || this.currentImg == 27 && this.inWater){
                // once true, there is nothing to get it out of the if statement
            }
            else{
                this.currentImg--;
            }
        }
        else {
            this.currentImg = PLAYER_MAX;
        }
    },
    enterWater : function(){
        if(this.y >= WAVE_POSITION - 20 && !this.inWater){
            scoring.outAir();
            if (crush.isUnderWave() || this.currentImg > 9 ){
                gameOver.over()
            }
            if (ENTER_WATER_SPEED[this.currentImg]) {
                this.speedY = ENTER_WATER_SPEED[this.currentImg];
            }

            this.inWater = true;
            if(scoring.numberOfLoops > 0){
                this.speedY *= 2.5; 
            }
            scoring.loopScore()
        }
        if(this.y < WAVE_POSITION - 20 && this.inWater){
            scoring.inAir();
            this.inWater = false;
        }
    },
    loop : function(){
        for (var i=0; i<LOOP_BREAKPOINTS.length; i++) {
            if(this.currentImg == LOOP_BREAKPOINTS[i] && !this.inWater){
                scoring.loopPositions[i] = true;
            }
        }
        if(scoring.loopPositions.indexOf(false) == -1){ // if there are no false in the list then it will give -1. indexOf checks the position of an item in a list
            scoring.numberOfLoops++;
            scoring.resetLoopPositions();
        }
    }
}
