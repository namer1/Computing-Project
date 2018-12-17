var gameOver ={
    over : function(){
        //makes sure that once the player has lost, everything in the game loop will be stopped
        timer.stop();
        game.gameOver = true;
        // sends the player's score to the database and then it starts a follow up function
        server.saveScore(scoring.score, game.currentLvl+1).then(function(){
            server.getScores().then(function(list){ // makes sure that the top 10 scores table is drawn
                this.drawTable(list);
            }.bind(this))
        }.bind(this))
    },
    display : function(){
        this.canvas = document.getElementById("Game");
        this.calculateCanvas();
        var render = this.canvas.getContext("2d"); //allows to draw to the screen --> made into a local variable
        var bg = new Image(); // loads the game over backgroud image
        bg.src = END_SCREEN_BG;
        this.rect = {
            x : this.canvas.width -250, y : 50, w: 100, h: 100
        }; // creates a rectangle with the above proprtions and location
        bg.onload = function () {
            render.drawImage(bg,0,0,window.innerWidth, window.innerHeight);
            render.font = "30px Arial";
            render.fillText("Restart", this.rect.x + this.rect.w/2, 15 + this.rect.h/2); // telling the game where to draw the button restart inside the rectangle
            document.addEventListener('click', this.checkStart.bind(this)); // when the mouse is clicked the game will go to the function checkStart
            render.fillText("Game Over",this.canvas.width/20,15 + this.rect.h/2); // draws a game over sign that does nothing
        }.bind(this)
    },
    drawTable : function(list){
        var render = this.canvas.getContext("2d"); //allows to draw to the screen --> made into a local variable
        render.fillStyle = 'black'; // draws the table and text in black
        // 3 collumns for the table, the player, points and level
        // this is all collected using an SQL query in the index.php file in the php folder
        render.fillText("Player", this.canvas.width/2 - 400, 100);
        render.fillText("Points", this.canvas.width/2 - 200, 100);
        render.fillText("Level", this.canvas.width/2 - 50, 100);
        for (let index = 0; index < list.length; index++) { // starts a for loop to check each row of data that was collected form the query mentioned above
            const element = list[index]; // element is each row we go through
            if(element.selected){ 
                render.fillStyle = 'red' // this means that the rec text is your score and the player can see where he is in reagard to the rest of the best players
                //console.log(index == 0 && Math.round(scoring.score) >= element.points);
                if(index == 0 && Math.round(scoring.score) >= element.points){ // if the scores from the last game are the best ones in the game then, the game will sotre it to be used as teh coordinates for the best player
                    this.saveRecord();
                }
            }
            else{
                render.fillStyle = 'black'
            }
            // draws the information under the correct collumn
            render.fillText(element.username, this.canvas.width/2 - 400, 150 + 55*index)
            render.fillText(element.points, this.canvas.width/2 - 200, 150 + 55*index)
            render.fillText(element.level, this.canvas.width/2 - 50, 150 + 55*index)
        }
    },
    checkStart: function(event) { // only happens if the player clicks the mouse 
        var p = this.getMousePos(event); // gets the position of the mouse 
    
        if (p.x >= this.rect.x && p.x <= this.rect.x + this.rect.w &&
            p.y >= this.rect.y && p.y <= this.rect.y + this.rect.h) { // if the mouse is anywehre inside the rectangke that is used for the restart button
            location.reload(); // the player will be taken back to the start screen
        }
    },
    getMousePos : function(e) {
        var r = this.canvas.getBoundingClientRect(); // returns the size of an element and its position relative to the viewport.
        return {
            x: e.clientX - r.left,
            y: e.clientY - r.top
        };
    },
    calculateCanvas : function(){ // finds the size of the screen
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    saveRecord : function(){ // send the scores of the player to the server file which will send it to the php file that will upload it to the database
        server.saveRecord(JSON.stringify(player.record));
        //console.log(JSON.stringify(player.record));
        // DOES HAPPEN
    }
}