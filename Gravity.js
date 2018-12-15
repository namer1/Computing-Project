var gravity = {
    grav : function(){
        if(player.inWater){ // when the player is in the water
            player.speedY += GRAVITY_Y_WATER; // add to the speed of the player on the y axis the value of GRAVITY_Y_WATER (0.01)
        }
        else{ // when the player is in the air
            player.speedY += GRAVITY_Y_AIR; // add to the speed of the player on the y axis the value of GRAVITY_Y_AIR (0.08)
        }
        player.y += player.speedY; // adds the new y speed to the y position of the player and therfore making the player go down
        if(player.x >= window.innerWidth*3/4){ // once the plaeyr has reached 3 quesrted of the way of the size of the screen
            player.speedX = 0; // the player will not go any further on the x axis
        }
    }
}