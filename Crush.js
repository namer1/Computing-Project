var crush = {
    init : function(){
        this.x = -4000 - Math.random()*lvls[game.currentLvl].waveRandom;
        this.crushing = new Image();
        this.crushing.src = lvls[game.currentLvl].wave;
    },
    move : function(){
        this.x += BACKGROUND_SCROLL_X/2;
    },
    isUnderWave : function(){
        if (this.crushing) {
            return (player.x < this.x + this.crushing.width - 20);
        }
        return false;
    },
    crushBedrock : function(){
        if(player.y >= game.canvas.height-70){
            gameOver.over()
        }
    }
}