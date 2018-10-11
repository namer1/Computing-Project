var game = {
    gameOver: false,
    currentLvl: -1,
    init : function(){ // only happen once
        this.canvas = document.getElementById("Game");
        this.render = this.canvas.getContext("2d"); //allows to draw to the screen
        this.gameLoop = setInterval(this.draw.bind(this), 20); // 20 miliseconds per interval. BIND connects to the game variable
        this.backgroundSwitcher = setInterval(background.switch.bind(background), 200); // for the change in the waves
        player.keyPress();
        window.addEventListener("resize", startScreen.calculateCanvas.bind(startScreen))
        scoring.init();
    },
    startLevel: function() { // happens at the begnning of every level
        if (this.currentLvl < lvls.length-1){
            this.currentLvl++;
            background.init();
            timer.init(lvls[game.currentLvl].time); // how long the level is
            if (lvls[game.currentLvl].shouldLoadWave) {
                crush.init();
            }
            this.animals = [];
            this.animals.push(new Animal());
        }
        else{
            gameOver.over();
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
        this.animals.forEach(function(a){ a.move(); })
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
        this.animals.forEach(function(a){
            var img = a.images[a.imgNumber];
            this.render.drawImage(img, 0,0, img.width, img.height, a.x, 200, img.width, img.height);
        }.bind(this))


        if (this.gameOver) {
            gameOver.display(); // a problem. this is redrawing it over and over again. need to make sure it doesn't happen
        }
        else {
            this.update();
            this.render.drawImage(player.images[player.currentImg], player.x, player.y);
            if (crush.crushing) {
                this.render.drawImage(crush.crushing,0,0,crush.crushing.width,crush.crushing.height,crush.x,background.waveLvl,crush.crushing.width,this.canvas.height - WAVE_POSITION);
            }
            this.render.font = "30px Arial";
            this.render.fillStyle = 'red';
            this.render.fillText(timer.format(),this.canvas.width-150,50);
            this.render.fillText(scoring.score, this.canvas.width - 250,50);   
            
        }
    },
}
