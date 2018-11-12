class Animal { // everything will be run each time for every animal
    constructor(){
        this.x = 0;
        this.y = 0;
        this.type = Math.round(Math.random()); // 0 = dolphin, 1 = shark
        this.imgNumber = 0;
        this.images = [];
        this.path = [];
        this.pathCounter = 0;
        this.rect ={
            x: 0, y: 0, w: 0, h: 0 
        }
        switch (this.type) {
            case 0:
            for (var i = 0; i < 5; i++){
                this.images[i] = new Image();
                this.images[i].src = `${DOLPHIN_FOLDER}/dolphin${i+1}.png`;
            }
            this.path = dolphinPath;
            break;
            case 1:
            this.images[0] = new Image();
            this.images[0].src = `${SHARK_FOLDER}/shark1.png`;
            this.path = sharkPath;
            break;
        }
    }
    move(){
        this.x = this.path[this.pathCounter].x;
        this.y = this.path[this.pathCounter].y;
        this.rect ={
            x: this.x-15, y: this.y-15, w:this.images[this.imgNumber].width+30, h: this.images[this.imgNumber].height+30
        } /////////NEED TO INCREASE NUMBERS
        this.pathCounter++;
        if(this.pathCounter == this.path.length){
            this.pathCounter--;
        }
    }
    collisionTest(){
        console.log(player.x, player.y, this.rect)
        if (player.x >= this.rect.x && player.x <= this.rect.x + this.rect.w &&
            player.y >= this.rect.y && player.y <= this.rect.y + this.rect.h) {
            gameOver.over();
        }
    }
}