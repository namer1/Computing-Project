var gameOver ={
    over : function(){
        timer.stop();
        game.gameOver = true;
        server.saveScore(scoring.score, game.currentLvl+1).then(function(){
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
        for (let index = 0; index < list.length; index++) {
            const element = list[index]; // element is each row we go through
            if(element.selected){
                render.fillStyle = 'red'
                //console.log(index == 0 && Math.round(scoring.score) >= element.points);
                if(index == 0 && Math.round(scoring.score) >= element.points){
                    this.saveRecord();
                }
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
    saveRecord : function(){
        server.saveRecord(JSON.stringify(player.record));
        //console.log(JSON.stringify(player.record));
        // DOES HAPPEN
    }
}