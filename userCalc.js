var userCalc = {
    difficulty : 0,
    readUserData : function(){//going to return a number between 0 and 1
                            // 0 is easy & 1 very hard
        var total = 0 ;
        for (let index = 0; index < player.userData.length; index++) {
            const element = player.userData[index]; // add to the value element the data that is being taken from the database
            total += parseFloat(element.points) / parseFloat(element.level); 
            // adds to total a value of the score/level where the score was achieved in each loop done in the for loop
        }
        if(player.userData.length == 0){ // if a user has no data
            return 0; // leaves the file if there is no data for the user
        }
        var average = total / player.userData.length; // creates the average that will be used to find the difficulty
        userCalc.difficulty = Math.min( (average/950), 1); // 950 is the needed boundry to get to level 1
    },
    adjustDifficulty : function() { // makes sure that the difficulty value is adjusted after each level
        player.userData.push({ points: scoring.score, level: game.currentLvl });
        userCalc.readUserData();
    }
}