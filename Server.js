var server = {
    getScore : function(){
        return fetch("http://localhost").then((response) => response.json())
    },
    saveScore : function(name, score, time){
        var data = new FormData();
        data.append('username', name);
        data.append('points', score);
        data.append('time', time);
        return fetch("http://localhost/submit.php", {
            method: 'post',
            body: data
        })
    }
}