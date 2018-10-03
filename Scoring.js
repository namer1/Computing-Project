var scoring = {
    init : function(){
        this.score = 0;
        this.timeAir = 0;
        this.underWaveTime = 0;
        this.timeAirInterval = false;
        this.underWaveInterval = false;
        this.numberOfLoops = 0;
        this.resetLoopPositions();
    },
    inAir : function(){
        this.timeAirInterval = setInterval(this.tickAir.bind(this),1000);
    },
    outAir : function(){
        this.score += 0.5 * this.timeAir;
        clearInterval(this.timeAirInterval);
        this.timeAir = 0;
    },
    inWave : function(){
        if (!this.underWaveInterval) {
            this.underWaveInterval = setInterval(this.tickWave.bind(this),3000); // makes underWaveInterval a number (like true)
        }
    },
    outWave : function(){
        clearInterval(this.underWaveInterval);
        this.underWaveInterval = false;
        this.underWaveTime = 0;
    },
    tickAir : function(){
        this.timeAir += 1
    },
    tickWave : function(){
        if (crush.isUnderWave()) {
            this.score += 5
        }
    },
    resetLoopPositions: function () {
        this.loopPositions = [];
        for (var i=0; i<LOOP_BREAKPOINTS.length; i++) {
            this.loopPositions.push(false);
        }
    },
    loopScore : function(){
        this.score += this.numberOfLoops * 10;
        this.resetLoopPositions();
        this.numberOfLoops = 0;
    }
}