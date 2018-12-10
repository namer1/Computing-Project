var server = {
    getScores : function(){
        return fetch("http://localhost/php/").then((response) => response.json())
    },
    saveScore : function(score, level){
        var data = new FormData();
        data.append('username', name);
        data.append('points', score);
        data.append('level', level);
        return fetch("http://localhost/php/submit.php", {
            method: 'post',
            body: data
        }).then((response) => response.json());
    },
    saveRecord : function(file){
        var data = new FormData();
        data.append('file', file)
        return fetch("http://localhost/php/record.php", {
            method: 'post',
            body: data
        })
    },
    getRecord : function(){
        console.log("Hello"); // the function is being called upon and loaded properly
        // something in the fetch function does not work
        return fetch("http://localhost/php/getrecord.php").then((response) => JSON.stringify(response));
    }
}