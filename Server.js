var server = {
    getScores : function(){ // gests the players' scores
        return fetch("http://localhost/php/").then((response) => response.json())
    },
    saveScore : function(score, level){ // upload the data to the database
        var data = new FormData();
        data.append('username', name); // upload the username
        data.append('points', score); // the points collected
        data.append('level', level); // what level was reached
        return fetch("http://localhost/php/submit.php", { // send to the database through the php file submit
            method: 'post',
            body: data
        }).then((response) => response.json());
    },
    saveRecord : function(file){ // save the ghost player coordinates to the database
        var data = new FormData();
        data.append('file', file)
        return fetch("http://localhost/php/record.php", { // use the php file record to send it to the database
            method: 'post',
            body: data
        })
    },
    getRecord : function(){ // get the corrdinates from the database
        return fetch("http://localhost/php/getrecord.php").then((response) => response.json());//.json() takes a string and convert to JSON form
    },
    getUserStat : function(){ // get all of the data about the currently loggeed in user
        return fetch("http://localhost/php/userStat.php").then((response) => response.json());
    }
}