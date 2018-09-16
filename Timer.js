var timer = {
    init : function(lvlLength){
        this.lvlLength = lvlLength;
        this.currentTime = lvlLength;
        this.paused = false;
        this.start();
    },
    start : function(){
        this.gameTime = setInterval(this.tick.bind(this),1000);
    },
    tick : function(){
        if (this.currentTime == 0){
            alert("Win");
            this.stop();
        }
        else{
            this.currentTime -= 1;
        }
    },
    stop : function(){
        clearInterval(this.gameTime);
    },
    format : function(){
        var mins = Math.floor(this.currentTime/60);
        var sec = this.currentTime%60;
        return mins.toString().padStart(2,"0") + ":" + sec.toString().padStart(2,"0");
    },
    pause : function(){
        if (this.paused){
            this.start();
            this.paused = false;
            game.gameLoop = setInterval(game.draw.bind(game), 20); // 20 miliseconds per interval. BIND connects to the game variable
            game.backgroundSwitcher = setInterval(background.switch.bind(background), 200); // for the change in the waves
        }
        else{
            this.stop();
            this.paused = true;
            clearInterval(game.gameLoop);
            clearInterval(game.backgroundSwitcher);
        }
    }
}