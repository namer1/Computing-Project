var game = {
    gameOver: false,
    currentLvl: -1,
    init : function(){
        this.canvas = document.getElementById("Game");
        this.render = this.canvas.getContext("2d"); //allows to draw to the screen
        this.gameLoop = setInterval(this.draw.bind(this), 20); // 20 miliseconds per interval. BIND connects to the game variable
        this.backgroundSwitcher = setInterval(background.switch.bind(background), 200); // for the change in the waves
        player.keyPress();
        window.addEventListener("resize", startScreen.calculateCanvas.bind(startScreen))
    },
    startLevel: function() {
        this.currentLvl++;
        background.init();
        timer.init(10);
        scoring.init();
        if (lvls[game.currentLvl].shouldLoadWave) {
            crush.init();
        }
    },
    update : function(){
        background.scrollX();
        gravity.grav();
        player.enterWater();
        if (player.inWater && crush.isUnderWave()){
            scoring.inWave();
        }
        crush.crushBedrock();
        background.scrollY();
        crush.move();
        player.loop();
    },
    clear : function(){
        this.render.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    draw : function(){
        this.clear();
        
        if (background.backgroundSwitch){
            this.render.drawImage(background.sea,0,0,background.sea.width,background.sea.height,background.x,0,background.sea.width,this.canvas.height);
            this.render.drawImage(background.sea,0,0,background.sea.width,background.sea.height,background.x + background.sea.width,0,background.sea.width,this.canvas.height);    
            this.render.drawImage(background.day, 0,-45);
            this.render.drawImage(background.wave,0,0,background.wave.width,background.wave.height,background.x,background.waveLvl,background.wave.width,this.canvas.height - WAVE_POSITION);
            this.render.drawImage(background.wave,0,0,background.wave.width,background.wave.height,background.x + background.wave.width,background.waveLvl,background.wave.width,this.canvas.height - WAVE_POSITION);
        }
        else{
            this.render.drawImage(background.sea,0,0,background.sea.width,background.sea.height,background.x,0,background.sea.width,this.canvas.height);
            this.render.drawImage(background.sea,0,0,background.sea.width,background.sea.height,background.x + background.sea.width,0,background.sea.width,this.canvas.height);    
            this.render.drawImage(background.day, 0,-45);
            this.render.drawImage(background.wave2,0,0,background.wave2.width,background.wave2.height,background.x,background.waveLvl,background.wave2.width,this.canvas.height - WAVE_POSITION);
            this.render.drawImage(background.wave2,0,0,background.wave2.width,background.wave2.height,background.x + background.wave2.width,background.waveLvl,background.wave2.width,this.canvas.height - WAVE_POSITION);
        }

        if (this.gameOver) {
            this.render.fillText("Game over",50,50)
        }
        else {
            this.update();
            this.render.drawImage(player.images[player.currentImg], player.x, player.y);
            if (crush.crushing) {
                this.render.drawImage(crush.crushing,0,0,crush.crushing.width,crush.crushing.height,crush.x,background.waveLvl,crush.crushing.width,this.canvas.height - WAVE_POSITION);
            }
            this.render.font = "30px Arial";
            this.render.fillText(timer.format(),this.canvas.width-150,50)
            this.render.fillText(scoring.score, this.canvas.width - 250,50)
        }
    }
}
