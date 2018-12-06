var gravity = {
    grav : function(){
        if(player.inWater){
            player.speedY += GRAVITY_Y_WATER;
        }
        else{
            player.speedY += GRAVITY_Y_AIR;
        }
        player.y += player.speedY;
        if(player.x >= window.innerWidth*3/4){
            player.speedX = 0;
        }
    }
}