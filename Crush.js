var crush = {
    init : function(){
        this.x = -4000 - Math.random()*6000;
        this.crushing = new Image();
        this.crushing.src = BACKGROUND_IMAGE_CRUSH;
    },
    move : function(){
        this.x += BACKGROUND_SCROLL_X/2;
    },
    isUnderWave : function(){
        return (player.x < this.x + this.crushing.width - 20);
    },
    crushBedrock : function(){
        if(player.y >= game.canvas.height-70){
            gameOver.over()
        }
    }
}