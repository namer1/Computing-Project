var startScreen = {
    display : function(){
        this.started = false;
        this.canvas = document.getElementById("Game");
        this.calculateCanvas();
        var render = this.canvas.getContext("2d");
        var bg = new Image();
        bg.src = START_SCREEN_BG;
        this.rectStart = {
            x : 100, y : 100, w: 100, h: 100
        };
        this.rectLogOut = {
            x : 500, y : 100, w: 100, h: 100
        };
        server.getRecord().then(function(coordinates){
            player.ghostplayer = coordinates
        });
        bg.onload = function () {
            render.drawImage(bg,0,0,window.innerWidth, window.innerHeight);
            render.font = "30px Arial";
            render.fillText("Start", this.rectStart.x + this.rectStart.w/2, this.rectStart.y + this.rectStart.h/2);
            render.fillText("log out", this.rectLogOut.x + this.rectLogOut.w/2, this.rectLogOut.y + this.rectLogOut.h/2);
            document.addEventListener('click', this.checkStart.bind(this));
            document.addEventListener('keydown', function(event){
                if (event.keyCode == 13 || event.keyCode == 32){
                    if (!this.started){
                        this.started = true;
                        this.startGame();
                    }
                }
            }.bind(this));

        }.bind(this)
    },
    checkStart: function(event) {
        var p = this.getMousePos(event);
    
        if (p.x >= this.rectStart.x && p.x <= this.rectStart.x + this.rectStart.w &&
            p.y >= this.rectStart.y && p.y <= this.rectStart.y + this.rectStart.h) {
            this.startGame();
        }

        if (p.x >= this.rectLogOut.x && p.x <= this.rectLogOut.x + this.rectLogOut.w &&
            p.y >= this.rectLogOut.y && p.y <= this.rectLogOut.y + this.rectLogOut.h) {
            location.href = "php/logout.php";
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
    startGame : function(){
        player.init(35);
    }
}

