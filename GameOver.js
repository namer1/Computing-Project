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
        server.saveScore(name, scoring.score, game.currentLvl+1).then(function(){
            server.getScores().then(function(list){
                this.drawTable(list);
            }.bind(this))
        }.bind(this))
    },
    display : function(){
        this.canvas = document.getElementById("Game");
        this.calculateCanvas();
        var render = this.canvas.getContext("2d");
        var bg = new Image();
        bg.src = END_SCREEN_BG;
        this.rect = {
            x : this.canvas.width -250, y : 50, w: 100, h: 100
        };
        bg.onload = function () {
            render.drawImage(bg,0,0,window.innerWidth, window.innerHeight);
            render.font = "30px Arial";
            render.fillText("Restart", this.rect.x + this.rect.w/2, 15 + this.rect.h/2);
            document.addEventListener('click', this.checkStart.bind(this));
            render.fillText("Game Over",50,15 + this.rect.h/2);
        }.bind(this)
    },
    drawTable : function(list){
        var render = this.canvas.getContext("2d");
        render.fillStyle = 'black';
        render.fillText("Player", this.canvas.width/2 - 400, 100);
        render.fillText("Points", this.canvas.width/2 - 245, 100);
        render.fillText("Level", this.canvas.width/2 - 100, 100);
        var find_user = document.cookie.split('user_id=')[1];
        var user_id = -1;
        if (find_user) {
            user_id = find_user.split(';')[0]; // splits the cookie into a list twice and then takes the value of user_id
        }
        for (let index = 0; index < list.length; index++) {
            const element = list[index]; // element is each row we go through
            if(element.user_id == user_id){
                render.fillStyle = 'red'
            }
            else{
                render.fillStyle = 'black'
            }
            render.fillText(element.username, this.canvas.width/2 - 400, 150 + 55*index)
            render.fillText(element.points, this.canvas.width/2 - 245, 150 + 55*index)
            render.fillText(element.level, this.canvas.width/2 - 100, 150 + 55*index)

        }
    },
    checkStart: function(event) {
        var p = this.getMousePos(event);
    
        if (p.x >= this.rect.x && p.x <= this.rect.x + this.rect.w &&
            p.y >= this.rect.y && p.y <= this.rect.y + this.rect.h) {
            location.reload();
        }
    },
    getMousePos : function(e) {
        var r = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - r.left,
            y: e.clientY - r.top
        };
    },
    calculateCanvas : function(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
}