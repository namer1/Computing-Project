class Obstacle { // everything will be run each time for every animal
    constructor(){
        this.x = game.canvas.width;
        this.type = Math.floor(Math.random() * 4); // 0 = barrel, 1 = ship mast, 2 = rock, 3 = seaweed
        this.rect ={
            x: 0, y: 0, w: 0, h: 0 
        } // this will be a rectangle that will follow the obstacles
        switch (this.type) {
            case 0:
            this.i = 0
            this.image = new Image();
            this.image.src = `${OBSTACLES}/0.png`;
            this.y = 355;
            break;

            case 1:
            this.i = 1
            this.image = new Image();
            this.image.src = `${OBSTACLES}/1.png`;
            this.y = game.canvas.height-150;
            break;

            case 2:
            this.i = 2
            this.image = new Image();
            this.image.src = `${OBSTACLES}/2.png`;
            this.y = 290;
            break;

            case 3:
            this.i = 3
            this.image = new Image();
            this.image.src = `${OBSTACLES}/3.png`;
            this.y = game.canvas.height-100;
            break;
        }
        // This statement will allow the game to randomly choose one of the pictures for the game to load as the obstacles
    }
    move(){
        this.x -= 5 * (1 + userCalc.difficulty);
        this.rect ={
            x: this.x, y: this.y, w:this.image.width, h: this.image.height
        } // the obs
    }
    collisionTest(){
        if (this.hasCollidedX() && this.hasCollidedY()) {
                gameOver.over();
        } // if both of them are true, then it means that the player is inside the area of the image and threfore collided
    }
    hasCollidedX() {
        return (player.x >= this.rect.x && player.x <= this.rect.x + this.rect.w) ||
               (player.x + player.width >= this.rect.x && player.x + player.width <= this.rect.x + this.rect.w)
    } // this checks if the player is anywhere inside the x-axis of the image
    hasCollidedY() {
        return (player.y >= this.rect.y && player.y <= this.rect.y + this.rect.h) ||
               (player.y + player.height >= this.rect.y && player.y + player.height <= this.rect.y + this.rect.h)
    } // this checks if the player is anywhere inside the y-axis of the image
}
// CAN BE IMPROVED BY MAKING IT NOT A RECTANGULAR BOUNDRY BOX