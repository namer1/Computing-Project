var server = {
    getScores : function(){
        var find_user = document.cookie.split('user_id=')[1];
        var user_id = -1;
        if (find_user) {
            user_id = find_user.split(';')[0]; // splits the cookie into a list twice and then takes the value of user_id
        }
        return fetch("http://localhost/php/?user_id=" + user_id).then((response) => response.json())
    },
    saveScore : function(name, score, level){
        var data = new FormData();
        var find_user = document.cookie.split('user_id=')[1];
        var user_id = -1;
        if (find_user) {
            user_id = find_user.split(';')[0]; // splits the cookie into a list twice and then takes the value of user_id
        }
        data.append('user_id', user_id);
        data.append('username', name);
        data.append('points', score);
        data.append('level', level);
        return fetch("http://localhost/php/submit.php", {
            method: 'post',
            body: data
        }).then((response) => response.json()).then(function(response){// convert to json form and then shows what will happen after saving scores
            var d = new Date();
            d.setFullYear(d.getFullYear()+1);
            document.cookie = `user_id=${response}; expires=${d.toDateString()} 23:59:59 UTC; path=/`; // crating a cookie for a whole year
        })
    },
    saveRecord : function(file){
        var data = new FormData();
        data.append('file', file)
        return fetch("http://localhost/php/record.php", {
            method: 'post',
            body: data
        })  
    }
}

//TRY AND MAKE THE USERS WITH PASSWORDS. NEED MORE COMPLEXITY