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
        if(player.x >= 500){
            player.speedX = 0;
        }
    },
    airResistance : function(){
        if(!player.inWater){ 
            // WHEN HE IS GOING UP AND DOWN, IT SHOULD BE DIFFERENT FROM EACH OTHER
        }
    },
    waterResistance : function(){
        if(player.inWater){

        }
    }
}