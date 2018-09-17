var server = {
    getScore : function(){
        return fetch("http://localhost").then((response) => response.json())
    },
    saveScore : function(name, score, time, loops){
        var data = new FormData();
        data.append('username', name);
        data.append('points', score);
        data.append('time', time);
        data.append('loops', loops);
        return fetch("http://localhost/submit.php", {
            method: 'post',
            body: data
        })
    }
}