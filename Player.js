var player = {
    ghostplayer : [],
    ghostplayerCount : 0,
    init : function(number){
        this.inWater = false;
        this.width = 80;
        this.height = 80;
        this.speedY = 0;
        this.speedX = 0.2;
        //this.maxSpeedX = window.innerWidth/lvls[game.currentLvl].time;
        //MAX speed of player should be canvas width divided by time of level TO ALLOW PLAYER TO OUTRUN THE CRUSHING WAVE
        this.x = PLAYER_POS_X_INITIAL;
        this.y = PLAYER_POS_Y_INITIAL;
        this.images = [];
        this.currentImg = START_POSITION;
        for (var i = 0; i <= number; i++){
            this.images[i] = new Image();
            this.images[i].onload = function(i) {
                if (i == number - 1){
                    game.init();
                    game.startLevel();
                    if(lvls[game.currentLvl].loadShadow){
                        this.shadow = new Image();
                        this.shadow.src = SHADOW;
                        this.moon = new Image();
                        this.moon.src = MOON;
                    }
                }
            }.bind(this, i);
            this.images[i].src = `sprites/Surfer/NEW/${i}.png`;
        }
        this.record = [];
        
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
                    this.speedY = (ARROW_SPEED[this.currentImg]  + this.speedY)/2;
                }
            }
            if (event.keyCode == RIGHT_ARROW){ 
                this.nextImage();
                if (this.inWater){
                    this.speedY = (ARROW_SPEED[this.currentImg]  + this.speedY)/2;
                }
            }
        }.bind(this));

    },
    nextImage : function () {
        if(this.currentImg < PLAYER_MAX){
            if(this.currentImg != 9 || !this.inWater){
                this.currentImg++;
            }
        }
        else {
            this.currentImg = PLAYER_MIN;
        }
    },
    previousImage : function () {
        if(this.currentImg > PLAYER_MIN){
            if(this.currentImg != 27 || !this.inWater){
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
		//if (crush.isUnderWave == true && this.y == WAVE_POSITION){
			//gameOver.over()
		//}
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
    },
    recordChanges : function(){
        this.record.push({x:this.x, y:this.y, imgNum: this.currentImg});
        console.log({x:this.x, y:this.y, imgNum: this.currentImg});
        // DOES WORK
    }
}