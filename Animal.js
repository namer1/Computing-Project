class Animal { // everything will be run each time for every animal
    constructor(){
        this.x = 0;
        this.y = 0;
        this.type = Math.round(Math.random()); // 0 = dolphin, 1 = shark
        this.imgNumber = 0;
        this.images = [];
        this.path = [];
        this.pathCounter = 0;
        this.playerWidth = player.currentImg.width / 2
        this.playerHeight = player.currentImg.height / 2

        this.rect ={
            x: 0, y: 0, w: 0, h: 0 
        }
        switch (this.type) {
            case 0:
            this.images[0] = new Image();
            this.images[0].src = `${OBSTACLES}/0.png`;
            break;

            case 1:
            this.images[1] = new Image();
            this.images[1].src = `${OBSTACLES}/1.png`;
            break;

            case 2:
            this.images[2] = new Image();
            this.images[2].src = `${OBSTACLES}/2.png`;
            break;

            case 3:
            this.images[3] = new Image();
            this.images[3].src = `${OBSTACLES}/3.png`;
            break;
        }
        
    }
    move(){
        // this.x = this.path[this.pathCounter].x;
        // this.y = this.path[this.pathCounter].y;
        // this.rect ={
        //     x: this.x-60, y: this.y-60, w:this.images[this.imgNumber].width+120, h: this.images[this.imgNumber].height+120
        // } 
        // this.pathCounter++;
        // if(this.pathCounter == this.path.length){
        //     this.pathCounter--;
        // }
    }
    collisionTest(){
        if (player.x >= this.rect.x && player.x <= this.rect.x + this.rect.w &&
            player.y >= this.rect.y && player.y <= this.rect.y + this.rect.h) {
                gameOver.over();
        }
    }
}