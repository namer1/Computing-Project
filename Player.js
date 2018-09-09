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
                    this.speedY = LEFT_ARROW_SPEED[this.currentImg]
                }
            }
            if (event.keyCode == RIGHT_ARROW){ 
                this.nextImage();
                if (this.inWater){
                    switch(this.currentImg){
                        case 1: case 2: 
                        this.speedY = 0.5; break;
                        case 3: case 4: 
                        this.speedY = 1.5; break;
                        case 5: case 6:
                        this.speedY = 2.5; break;
                        case 7: case 8:
                        this.speedY = 3.5; break;
                        case 9:
                        this.speedY = 4.5;break;
                    }
                }
            }
        }.bind(this));
    },
    nextImage : function () {
        if(this.currentImg < PLAYER_MAX){
            this.currentImg++;
        }
        else {
            this.currentImg = PLAYER_MIN;
        }
    },
    previousImage : function () {
        if(this.currentImg > PLAYER_MIN){
            this.currentImg--;
        }
        else {
            this.currentImg = PLAYER_MAX;
        }
    },
    enterWater : function(){
        if(this.y >= WAVE_POSITION - 20 && !this.inWater){
            scoring.outAir();
            if (crush.isUnderWave() || this.currentImg > 9 ){
                alert("CRUSHED")
                timer.stop();
                game.gameOver = true;
            }
            switch(this.currentImg){
                case 1: case 2: case 3:
                this.speedY = 1; break;
                case 4: case 5: case 6:
                this.speedY = 2; break;
                case 7: case 8: case 9:
                this.speedY = 3; break;
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
// NEED TO MOVE ALL OF THE SWITCH AND NUMBERS FROM FILE