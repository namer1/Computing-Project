var startScreen = {
    display : function(){
        this.started = false;
        this.canvas = document.getElementById("Game");
        this.calculateCanvas();
        var render = this.canvas.getContext("2d"); //allows to draw to the screen
        var bg = new Image(); // creates an image variable 
        bg.src = START_SCREEN_BG; // the locarion of the image
        this.rectStart = { // creates a rectangle for the start button
            x : this.canvas.width/20, y : this.canvas.height/4, w: 100, h: 100
        };
        this.rectLogOut = { // creates a rectangle for the logout button
            x : (3*this.canvas.width)/4, y : this.canvas.height/4, w: 100, h: 100
        };
        server.getRecord().then(function(coordinates){ // loads the ghost player coordiantes from the database and then puts them in a list
            player.ghostplayer = coordinates;
        });
        server.getUserStat().then(function(data){ // loads the user data for the linear regression from the database and then puts them in a list
            player.userData = data;
        })
        bg.onload = function () { // when background finishes loading:
            render.drawImage(bg,0,0,window.innerWidth, window.innerHeight); // draw it on the whole screen
            // draw those 2 buttons int this font and size:
            render.font = "30px Arial";
            render.fillText("Start", this.rectStart.x + this.rectStart.w/2, this.rectStart.y + this.rectStart.h/2); 
            render.fillText("log out", this.rectLogOut.x + this.rectLogOut.w/2, this.rectLogOut.y + this.rectLogOut.h/2);
            document.addEventListener('click', this.checkStart.bind(this)); // when the buttons are pressed
            document.addEventListener('keydown', function(event){
                if (event.keyCode == 13 || event.keyCode == 32){ // when the space bar or enter key are pressed
                    if (!this.started){ // if the game has not started yet
                        this.started = true; // game has started
                        this.startGame(); // start the game
                    }
                }
            }.bind(this));

        }.bind(this)
    },
    checkStart: function(event) { // check what to do
        var p = this.getMousePos(event);
    
        if (p.x >= this.rectStart.x && p.x <= this.rectStart.x + this.rectStart.w &&
            p.y >= this.rectStart.y && p.y <= this.rectStart.y + this.rectStart.h) { // if the start butto is pressed
            this.startGame(); // start the game
        }

        if (p.x >= this.rectLogOut.x && p.x <= this.rectLogOut.x + this.rectLogOut.w &&
            p.y >= this.rectLogOut.y && p.y <= this.rectLogOut.y + this.rectLogOut.h) { // if the log out button is pressed
            location.href = "php/logout.php"; // log out of your account
        }
    },
    getMousePos : function(e) { // detects where the mouse is on teh screen
        var r = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - r.left,
            y: e.clientY - r.top
        };
    },
    calculateCanvas : function(){ // finds the size of the canavas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    startGame : function(){ // what to do when the game starts
        player.init(35); 
        // runs that init function of the player which tells the game how many images are being uploaded to be used for the surfer
    }
}

