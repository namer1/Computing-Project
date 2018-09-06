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
        this.wave.src = BACKGROUND_IMAGE;
        this.wave2.src = BACKGROUND_IMAGE2;
        this.sea.src = SEA;
        this.day.src = DAY_OBJECTS;
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
    }
}
