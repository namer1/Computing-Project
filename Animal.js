class Animal { // everything will be run each time for every animal
    constructor(){
        this.x = game.canvas.width;
        this.type = Math.floor(Math.random() * 4); // 0 = barrel, 1 = ship mast, 2 = rock, 3 = seaweed
        this.rect ={
            x: 0, y: 0, w: 0, h: 0 
        }
        switch (this.type) {
            case 0:
            this.image = new Image();
            this.image.src = `${OBSTACLES}/0.png`;
            this.y = 355;
            break;

            case 1:
            this.image = new Image();
            this.image.src = `${OBSTACLES}/1.png`;
            this.y = game.canvas.height-150;
            break;

            case 2:
            this.image = new Image();
            this.image.src = `${OBSTACLES}/2.png`;
            this.y = 290;
            break;

            case 3:
            this.image = new Image();
            this.image.src = `${OBSTACLES}/3.png`;
            this.y = game.canvas.height-100;
            break;
        }
        
    }
    move(){
        this.x -= 5;
        this.rect ={
            x: this.x, y: this.y, w:this.image.width, h: this.image.height
        } 
    }
    collisionTest(){
        if (this.hasCollidedX() && this.hasCollidedY()) {
                gameOver.over();
        }
    }
    hasCollidedX() {
        return (player.x >= this.rect.x && player.x <= this.rect.x + this.rect.w) ||
               (player.x + player.width >= this.rect.x && player.x + player.width <= this.rect.x + this.rect.w)
    }
    hasCollidedY() {
        return (player.y >= this.rect.y && player.y <= this.rect.y + this.rect.h) ||
               (player.y + player.height >= this.rect.y && player.y + player.height <= this.rect.y + this.rect.h)
    }
    // CAN BE IMPROVED BY MAKING IT NOT A RECTANGULAR BOUNDRY BOX
}