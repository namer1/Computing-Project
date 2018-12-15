var crush = {
    init : function(){
        this.x = -4000 - Math.random()*lvls[game.currentLvl].waveRandom; // tells the function by what value to multiply it according to the level,
                                                                         // as it becomes harder, the wave will start closer to the player
        this.crushing = new Image();
        this.crushing.src = lvls[game.currentLvl].wave;
        // this loads the image of teh wave tha will come torwads the player and will attempt to crush him 
        // --> make it look like there is a tunnel being made for the plaeyr to surf in
    },
    move : function(){
        this.x += background.currentScrollSpeed/5; // moves the wave across the x-axis at half the rate that the waves move in but in the opposite direction
    },
    isUnderWave : function(){
        if (this.crushing) {
            return (player.x < this.x + this.crushing.width - 20); // this will tell the game if the player is is under the wave as long as 
                                                                   // the wave was loaded onto the game this level
        }
        return false;
    },
    crushBedrock : function(){
        if(player.y >= game.canvas.height-70){
            gameOver.over()
        } // if the player has reached the bedrock at the bottom of the screen, then he will crush and lose
    }
}