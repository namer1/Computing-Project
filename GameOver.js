var gameOver ={
    over : function(){
        timer.stop();
        game.gameOver = true;
        var find_user = document.cookie.split('user_id=')[1];
        var name = null;
        if (!find_user) { // asks for the name only if there is no user_id
            name = prompt("What is your name? ");
            if (name == null || name == ""){
                name = 'Anonymous'
            }
        }
        server.saveScore(name, scoring.score, game.currentLvl+1)
    }
}