var gameOver ={
    over : function(){
        timer.stop();
        game.gameOver = true;
        var name = prompt("What is your name? ");
        if (name == null || name == ""){
            name = 'Anonymous'
        }
        server.saveScore(name, scoring.score, timer.lvlLength - timer.currentTime)
    }
}