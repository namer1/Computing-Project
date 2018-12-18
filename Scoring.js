var scoring = {
    init : function(){
        this.score = 0; // original score is 0
        this.timeAir = 0; // original time in the air is 0
        this.underWaveTime = 0; // original under the crushing wave is 0
        this.timeAirInterval = false; // clock in charge of checkng how long player is in the air
        this.underWaveInterval = false; // clock in charge of checking how long player is under the crushing wave
        this.numberOfLoops = 0; // original number of loops is 0
        this.resetLoopPositions(); // makes sure that the list of values that check the loop position is empty
    },
    inAir : function(){
        this.timeAirInterval = setInterval(this.tickAir.bind(this),1000); // check for how long player is in the air
                                                                          // runs the function tickAir()
    },
    outAir : function(){ // when the player enters the water
        this.score += 0.5 * this.timeAir; // award player for every second player is in the air
        clearInterval(this.timeAirInterval); // resests the clock
        this.timeAir = 0;
    },
    tickAir : function(){
        this.timeAir += 1 // add 1 for every second it is run
    },
    inWave : function(){ // when player is under the crushing wave
        if (!this.underWaveInterval) { // if this is false
            this.underWaveInterval = setInterval(this.tickWave.bind(this),3000); // makes underWaveInterval a number (like true)
        }
    },
    outWave : function(){ // player is not under the wave anymore
        clearInterval(this.underWaveInterval); // resets the clock
        this.underWaveInterval = false; 
        this.underWaveTime = 0;
    },
    tickWave : function(){
        if (crush.isUnderWave()) { // if player is under the crushig wave
            this.score += 5 // add 5 to score after every 3 secods
        }
    },
    resetLoopPositions: function () { // makes sure that the list loopPositions is empty --> has all false in it
        this.loopPositions = [];
        for (var i=0; i<LOOP_BREAKPOINTS.length; i++) {
            this.loopPositions.push(false);
        }
    },
    loopScore : function(){
        this.score += this.numberOfLoops * 10; // add 10 * number of loops done until landing in the water
        this.resetLoopPositions();
        this.numberOfLoops = 0;
    }
}