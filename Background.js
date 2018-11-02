var background = {
    init : function(){
        this.x = 0;
        this.waveLvl = WAVE_POSITION;
        this.wave = new Image();
        this.wave2 = new Image();
        this.sea = new Image();
        this.day = new Image();
        this.wave.onload = function() {
            this.scrollX();
        }.bind(this);
        this.wave.src = lvls[game.currentLvl].background1;
        this.wave2.src = lvls[game.currentLvl].background2;
        this.sea.src = lvls[game.currentLvl].sea;
        this.day.src = lvls[game.currentLvl].day;
        this.backgroundSwitch = false;
    },
    scrollX : function(){
        if (this.x + this.wave.width <= 0){
            this.x = 0;
        }
        this.x = this.x - BACKGROUND_SCROLL_X; 
    },
    scrollY : function(){
        if(player.y < WAVE_POSITION){
            this.waveLvl = WAVE_POSITION*2 - player.y;            
        }
        else{
            this.waveLvl = WAVE_POSITION;
        }
    },
    switch : function(){
        this.backgroundSwitch = !this.backgroundSwitch
    },
    shadow : function(){
        
    }
}
