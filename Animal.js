class Animal { // everything will be run each time for every animal
    constructor(){
        this.x = game.canvas.width + Math.random()*2000;
        this.type = Math.round(Math.random()); // 0 = dolphin, 1 = shark
        this.imgNumber = 0;
        this.images = [];
        switch (this.type) {
            case 0:
            for (var i = 0; i < 5; i++){
                this.images[i] = new Image();
                this.images[i].src = `${DOLPHIN_FOLDER}/dolphin${i+1}.png`;
            }
            break;
            case 1:
            this.images[0] = new Image();
            this.images[0].src = `${SHARK_FOLDER}/shark1.png`;
            break;
        }
        this.animateTimer = setInterval(function(){
            if(this.x < 500){
                this.nextImg();
            }
        }.bind(this), 50)
    }
    nextImg(){
        if(this.type == 0 && this.imgNumber < 4){
            this.imgNumber++;
        } 
    }
    move(){
        this.x -= 5;
    }
}