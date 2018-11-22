var gravity = {
    grav : function(){
        if(player.inWater){
            player.speedY += GRAVITY_WATER;
        }
        else{
            player.speedY += GRAVITY_AIR;
        }
        player.y += player.speedY;
        player.x += player.speedX;
        if(player.x >= window.innerWidth/lvls[game.currentLvl].time){
            player.speedX = 0;
        }
    }
}